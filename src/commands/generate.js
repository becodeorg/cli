/* becodeorg/cli
 *
 * /src/commands/generate.js - Generate Command
 *
 * coded by leny@BeCode
 * started at 08/11/2018
 */

import reporter from "../core/reporter";
import generateIgnore from "./generate/ignore";
import generateEnv from "./generate/env";

export const command = "generate <type>";

export const description = "Generate files for your repository";

export const options = [
    [
        "-o, --output <path>",
        "Generate files at specified path (defaults to current git repo root)",
    ],
];

export const action = async (type, cmd) => {
    switch (type.toLowerCase()) {
        case "env":
            await generateEnv(cmd);
            break;
        case "ignore":
            await generateIgnore(cmd);
            break;
        default:
            reporter.warning(
                `Unknown file type "${type}" for generate command.`,
            );
            break;
    }
};
