/* becodeorg/cli
 *
 * /src/commands/whoami.js - Whoami Command
 *
 * coded by leny@BeCode
 * started at 07/05/2020
 */

import chalk from "chalk";
import ora from "ora";
import {userRequest, getContext} from "../core/graph";
import reporter from "../core/reporter";

const spinner = ora();

export const command = "whoami";

export const description =
    "Fetch yourself from BeCode GraphQL API. Require to be logged.";

export const options = [
    ["--local", "Use the local version of the API"],
    ["--staging", "Use the staging version of the API"],
];

export const action = async (cmd) => {
    const context = getContext(cmd);

    try {
        spinner.start("Fetchind data…");

        const {
            consumer: {
                owner: {name, displayname, type},
            },
        } = await userRequest(
            `
                query consumer {
                    consumer {
                        owner {
                            type: __typename
                            ... on Person {
                                name
                            }
                            ... on Coach {
                                displayname
                            }
                            ... on Staff {
                                displayname
                            }
                        }
                    }
                }
            `,
            {},
            context,
        );

        spinner.succeed();

        reporter.log(
            `You're connected as ${chalk.cyan(
                displayname || name,
            )} (${chalk.yellow(type)}).`,
        );

        process.exit(0);
    } catch (error) {
        spinner.fail();
        reporter.die(`${error.message || error}`);
    }
};
