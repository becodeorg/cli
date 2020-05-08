/* becodeorg/cli
 *
 * /src/commands/login-as.js - Login As Command
 *
 * coded by leny@BeCode
 * started at 27/10/2019
 */

import chalk from "chalk";
import ora from "ora";
import {request, userRequest, getContext} from "../core/graph";
import reporter from "../core/reporter";
import {set as setConfig, get as getConfig} from "../core/configuration";

const gql = String.raw;

const spinner = ora();

export const command = "login-as [type] [slug]";

export const description =
    "Login as someone to your account on the BeCode GraphQL API. Require admin_key, only available in local & staging environments.";

export const options = [
    ["--local", "Use the local version of the API"],
    ["--staging", "Use the staging version of the API"],
];

export const action = async (rawType, rawSlug, cmd) => {
    const context = getContext(cmd);

    context !== "prod" ||
        reporter.die("Can't run this command in production environment.");

    const admin_key = getConfig()[`${context}_admin_key`];

    admin_key || reporter.die("You need an admin key to perform this command.");

    const type = (rawType || "").toUpperCase();

    type || reporter.die("No type given!");

    const slug = (rawSlug || "").toLowerCase();

    slug || reporter.die("No slug given!");

    try {
        spinner.start("Login to BeCode Graph API…");

        const {
            loginAs: {token},
        } = await request(
            gql`
                mutation loginAs(
                    $type: UserType!
                    $slug: String!
                    $admin_key: String!
                ) {
                    loginAs(
                        collection: $type
                        slug: $slug
                        key: $admin_key
                        useCookie: false
                    ) {
                        token
                    }
                }
            `,
            {type, slug, admin_key},
            context,
        );

        setConfig({[`${context}_token`]: token});

        const {
            consumer: {
                owner: {name, displayname},
            },
        } = await userRequest(
            gql`
                query consumer {
                    consumer {
                        owner {
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

        reporter.log(`You're connected as ${chalk.cyan(displayname || name)}.`);

        process.exit(0);
    } catch (error) {
        spinner.fail();
        reporter.die(error.message || error);
    }
};
