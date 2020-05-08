/* becodeorg/cli
 *
 * /src/commands/directory.js - Directory Command
 *
 * coded by leny@BeCode
 * started at 08/05/2019
 */

import reporter from "../core/reporter";
import directoryList from "./directory/list";

export const command = "directory <type> [query]";

export const description = "Directory (who's who of BeCode people)";

export const options = [
    ["--local", "Use the local version of the API"],
    ["--staging", "Use the staging version of the API"],
];

export const action = async (rawType, rawQuery, cmd) => {
    const type = (rawType || "").toLowerCase();
    const query = (rawQuery || "").toLowerCase();

    const types = {
        list: directoryList,
    };

    try {
        const subCommand = types[type];

        await subCommand(query, cmd);
    } catch (error) {
        reporter.log("Aborted.");
    }
};
