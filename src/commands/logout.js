/* becodeorg/cli
 *
 * /src/commands/logout.js - Logout Command
 *
 * coded by leny@BeCode
 * started at 08/05/2020
 */

import ora from "ora";
import {userRequest, getContext} from "../core/graph";
import reporter from "../core/reporter";
import {set as setConfig} from "../core/configuration";

const spinner = ora();

export const command = "logout";

export const description =
    "Logout yourself from BeCode GraphQL API. Require to be logged.";

export const options = [
    ["--local", "Use the local version of the API"],
    ["--staging", "Use the staging version of the API"],
];

export const action = async (cmd) => {
    const context = getContext(cmd);

    try {
        spinner.start("Logout…");

        await userRequest(
            `
                mutation revoke {
                    revoke
                }
            `,
            {},
            context,
        );

        setConfig({[`${context}_token`]: null});

        spinner.succeed();

        reporter.success("You're not logged anymore.");

        process.exit(0);
    } catch (error) {
        spinner.fail();
        reporter.die(`${error.message || error}`);
    }
};
