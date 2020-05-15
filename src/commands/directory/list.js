/* becodeorg/cli
 *
 * /src/commands/directory/list.js - Director Command: list
 *
 * coded by leny@BeCode
 * started at 08/05/2020
 */

import chalk from "chalk";
import ora from "ora";
import {userRequest, getContext} from "../../core/graph";
import reporter from "../../core/reporter";
import {Select} from "enquirer";
import {showDetails} from "./details";

const gql = String.raw;

const spinner = ora();

export default async function (query, cmd) {
    const context = getContext(cmd);

    const fetchPersons = async (pageNumber = 1) => {
        spinner.start(
            `Fetching data${pageNumber > 1 ? ` (page ${pageNumber})` : ""}…`,
        );

        const {
            persons: {totalCount, pageInfo, nodes},
        } = await userRequest(
            gql`
                query persons(
                    $pageSize: Int = 25
                    $pageNumber: Int = 1
                    $orderField: PersonOrderField! = LASTNAME
                    $orderDirection: OrderDirection! = ASC
                    $filterQuery: String! = ""
                ) {
                    persons(
                        pageSize: $pageSize
                        pageNumber: $pageNumber
                        orderBy: {
                            field: $orderField
                            direction: $orderDirection
                        }
                        filterOn: {
                            fields: {
                                firstname: $filterQuery
                                lastname: $filterQuery
                            }
                            operator: OR
                            fuzzy: true
                        }
                    ) {
                        totalCount
                        pageInfo {
                            pageTotal
                            pageNumber
                            hasPreviousPage
                            hasNextPage
                        }
                        nodes {
                            type: __typename
                            slug
                            firstname
                            lastname
                            ... on Junior {
                                avatar
                                promo {
                                    name
                                    generation
                                }
                            }
                            ... on Coach {
                                avatar
                                promos {
                                    name
                                    generation
                                }
                            }
                            ... on Staff {
                                avatar
                            }
                        }
                    }
                }
            `,
            {filterQuery: query, pageNumber},
            context,
        );

        spinner.succeed();

        if (!nodes.length) {
            reporter.log("No result");
        } else {
            reporter.log(`${totalCount} result${totalCount > 1 ? "s" : ""}`);
            const choices = [];

            if (pageInfo.hasPreviousPage) {
                choices.push({
                    name: ["__previous"],
                    message: `Previous page (${pageInfo.pageNumber - 1}/${
                        pageInfo.pageTotal
                    })`,
                });
            }

            choices.push(
                ...nodes.map((person) => ({
                    name: [person.type, person.slug],
                    message: `${chalk.cyan(person.lastname)} ${
                        person.firstname
                    } (${chalk.yellow(person.type)})`,
                })),
            );

            if (pageInfo.hasNextPage) {
                choices.push({
                    name: ["__next"],
                    message: `Next page (${pageInfo.pageNumber + 1}/${
                        pageInfo.pageTotal
                    })`,
                });
            }

            const prompt = new Select({
                name: "person",
                choices,
            });

            const choice = await prompt.run();

            if (choice[0] === "__previous") {
                return fetchPersons(pageNumber - 1);
            }
            if (choice[0] === "__next") {
                return fetchPersons(pageNumber + 1);
            }

            return choice;
        }
    };

    try {
        const choice = await fetchPersons();

        if (choice) {
            const [type, slug] = choice;

            await showDetails(context, type, slug, cmd.withId);
        }

        process.exit(0);
    } catch (error) {
        spinner.fail();
        reporter.die(`${error.message || error}`);
    }
}
