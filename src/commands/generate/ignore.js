/* becodeorg/cli
 *
 * /src/commands/generate/ignore.js - Generate Command: ignore type
 *
 * coded by leny@BeCode
 * started at 08/11/2018
 */

import path from "path";
import fs from "fs";
import {confirm, select} from "enquirer";
import chalk from "chalk";

import {getGitRoot} from "../../core/utils";
import reporter from "../../core/reporter";

const data = require("../../../data/ignores.json");

export default async function(cmd) {
    let gitRoot;

    if (cmd.output) {
        reporter.warning(
            `Option ${chalk.cyan("output")} is ignored for this target`,
        );
    }

    if (!(gitRoot = await getGitRoot())) {
        return reporter.error(
            `You're not in a ${chalk.cyan("git")} repository!`,
        );
    }

    const preset = await select({
        name: "preset",
        message: `Choose your preset for the ${chalk.yellow(
            ".gitignore",
        )} file:`,
        choices: Object.keys(data),
    });

    const ignoreContent = fs.readFileSync(
        path.resolve(__dirname, `../../../data/ignores/${data[preset]}`),
        "utf8",
    );

    const ignorePath = path.resolve(gitRoot, ".gitignore");

    if (fs.existsSync(ignorePath)) {
        const override = await confirm({
            name: "override",
            message: `You already have a ${chalk.yellow(
                ".gitignore",
            )} file in this repository! Will you ${chalk.bold.red(
                "replace",
            )} it by the selected one?`,
            initial: false,
        });

        if (!override) {
            return reporter.log("Aborted.");
        }
    }

    fs.writeFileSync(ignorePath, ignoreContent, "utf8");

    reporter.success(
        `Your ${chalk.yellow(".gitignore")} file has been created!`,
    );
}
