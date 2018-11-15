/* becodeorg/cli
 *
 * /src/commands/generate/readme.js - Generate Command: readme type (docker-compose generation)
 *
 * coded by leny@BeCode
 * started at 15/11/2018
 */

import path from "path";
import fs from "fs";
import {prompt, confirm} from "enquirer";
import chalk from "chalk";
import {DateTime} from "luxon";

import {get as getConfig} from "../../core/configuration";
import {getGitRoot} from "../../core/utils";
import reporter from "../../core/reporter";

const data = require("../../../data/readme.json");
const README_TPL = path.resolve(__dirname, "../../../data/readme/tpl.md");

export default async function(cmd) {
    const config = getConfig();

    let targetPath, readmeContent;

    if (cmd.output && (targetPath = path.resolve(process.cwd(), cmd.output))) {
        if (!fs.statSync(targetPath).isDirectory()) {
            return reporter.error(
                `Given output path (${chalk.yellow(
                    targetPath,
                )}) isn't a directory!`,
            );
        }
    } else if (!(targetPath = await getGitRoot())) {
        return reporter.error(
            `You're not in a ${chalk.cyan("git")} repository!`,
        );
    }

    reporter.log(
        `Welcome to ${chalk.cyan(
            "BeCode Readme generator",
        )}. Answer the following questions to generate a ${chalk.yellow(
            "readme.md",
        )} file for your project.`,
    );

    const values = await prompt([
        {
            type: "input",
            name: "projectName",
            message: "Project name:",
        },
        {
            type: "select",
            name: "type",
            message: "Project type:",
            choices: data.emoji_types
                .filter(({coach}) => {
                    return coach ? config && config.coach : true;
                })
                .map(({emoji, title, description}) => ({
                    indicator: emoji,
                    name: title,
                    message: `${emoji}\u{00A0}\u{00A0}${title}`,
                    hint: chalk.italic(description),
                })),
            initial: data.emoji_types.findIndex(({title}) => {
                return config && config.coach
                    ? title === "Internal Projects"
                    : title === "Student Projects";
            }),
        },
        {
            type: "input",
            name: "authorName",
            message: "Project author:",
            initial: config && config.name,
        },
    ]);

    const now = DateTime.local().setLocale("en");

    readmeContent = fs.readFileSync(README_TPL, "utf8");

    readmeContent = readmeContent.replace(
        "[[PROJECT_NAME]]",
        values.projectName,
    );
    readmeContent = readmeContent.replace(
        "[[EMOJI_TYPE]]",
        data.emoji_types.find(({title}) => title === values.type).emoji,
    );
    readmeContent = readmeContent.replace(
        "[[START_DATE]]",
        `${now.toFormat("MMMM")} ${now.toFormat("yyyy")}`,
    );
    readmeContent = readmeContent.replace("[[AUTHOR]]", values.authorName);

    const readmePath = path.resolve(
        targetPath,
        `${cmd.output ? "readme" : "README"}.md`,
    );

    if (fs.existsSync(readmePath)) {
        const override = await confirm({
            name: "override",
            message: `You already have a ${chalk.yellow(
                cmd.output ? "readme.md" : "README.md",
            )} file in this ${
                cmd.output ? "folder" : "repository"
            }! Will you ${chalk.bold.red("replace")} it?`,
            initial: false,
        });

        if (!override) {
            return reporter.log("Aborted.");
        }
    }

    fs.writeFileSync(readmePath, readmeContent, "utf8");

    reporter.success(
        `Your ${chalk.yellow("readme.md")} file has been created!`,
        "Please review and complete it within your favorite editor",
    );
}
