/* becodeorg/cli
 *
 * /src/commands/generate/env.js - Generate Command: env type (docker-compose generation)
 *
 * coded by leny@BeCode
 * started at 08/11/2018
 */

/* eslint-disable */

import path from "path";
import fs from "fs";
import {select, multiselect, confirm} from "enquirer";
import chalk from "chalk";
import {stringify} from "json2yaml";

import {getGitRoot} from "../../core/utils";
import reporter from "../../core/reporter";

const data = require("../../../data/env.json");

export default async function() {
    let gitRoot,
        composeConfig = {
            version: "3",
            services: {},
        };

    if (!(gitRoot = await getGitRoot())) {
        return reporter.error(
            `You're not in a ${chalk.cyan("git")} repository!`,
        );
    }

    reporter.log(
        `Welcome to ${chalk.cyan(
            "env generator",
        )}. Answer the following questions to generate a ${chalk.yellow(
            "docker-compose",
        )} environment for your project.`,
    );

    const langage = await select({
        name: "langage",
        message: `Choose your ${chalk.yellow("langage")}:`,
        choices: Object.keys(data.langages),
    });

    const database = await multiselect({
        name: "database",
        message: `Choose your ${chalk.yellow("database(s)")}:`,
        choices: Object.keys(data.databases),
        initial: [],
    });

    const tools = await multiselect({
        name: "tools",
        message: `Choose your ${chalk.yellow("tool(s)")}:`,
        choices: database.reduce(
            (arr, db) => (arr.push(...data.databases[db]), arr),
            data.tools,
        ),
        initial: [],
    });

    [langage].concat(database, tools).forEach(service => {
        const {name, configuration} = data.services[service];

        composeConfig.services[name] = configuration;
    });

    const composePath = path.resolve(gitRoot, "docker-compose.yml");

    if (fs.existsSync(composePath)) {
        const override = await confirm({
            name: "override",
            message: `You already have a ${chalk.yellow(
                "docker-compose.yml",
            )} file in this repository! Will you ${chalk.bold.red(
                "replace",
            )} it?`,
            initial: false,
        });

        if (!override) {
            return reporter.log("Aborted.");
        }
    }

    fs.writeFileSync(composePath, stringify(composeConfig), "utf8");

    reporter.success(
        `Your ${chalk.yellow("docker-compose.yml")} file has been created!`,
        `Check the ${chalk.yellow("docker-readme.md")} file for more informations.`,
    );
}
