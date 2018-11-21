/* becodeorg/cli
 *
 * /src/commands/generate.js - Generate Command
 *
 * coded by leny@BeCode
 * started at 08/11/2018
 */

import {select} from "enquirer";

import reporter from "../core/reporter";
import generateIgnore from "./generate/ignore";
import generateEnv from "./generate/env";
import generateReadme from "./generate/readme";

export const command = "generate [type]";

export const description = "Generate files for your repository";

export const options = [
    [
        "-o, --output <path>",
        "Generate files at specified path (defaults to current git repo root)",
    ],
];

export const action = async (type, cmd) => {
    let typeKey = (type || "").toLowerCase();

    const types = {
        readme: [
            generateReadme,
            `Generate a readme file according to BeCode standards`,
        ],
        env: [generateEnv, `Generate a docker environment for your project`],
        ignore: [
            generateIgnore,
            `Generate a gitignore file according to your needs`,
        ],
    };

    if (!Object.keys(types).includes(typeKey)) {
        reporter.warning("Unknown or no type given!");

        typeKey = await select({
            name: "type",
            message: "Choose a type:",
            choices: Object.entries(types).map(([name, [, hint]]) => ({
                name,
                message: name,
                hint,
            })),
        });
    }

    const typeCommand = types[typeKey][0];

    await typeCommand(cmd);
};
