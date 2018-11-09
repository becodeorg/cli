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
import {select, multiselect} from "enquirer";
import chalk from "chalk";

import {getGitRoot} from "../../core/utils";
import reporter from "../../core/reporter";

const data = require("../../../data/env.json");

export default async function() {
    let gitRoot;

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
    },
    );

    const database = await multiselect({
        name: "database",
        message: `Choose your ${chalk.yellow("database(s)")}:`,
        choices: Object.keys(data.databases),
        initial: [],
    },
    );

    const tools = await multiselect({
        name: "tools",
        message: `Choose your ${chalk.yellow("tool(s)")}:`,
        choices: database.reduce(
            (arr, db) => (arr.push(...data.databases[db]), arr),
            data.tools,
        ),
        initial: [],
    },
    );

    console.log("Your choices:", {
        langage,
        database,
        tools,
    });
}
