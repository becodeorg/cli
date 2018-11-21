/* becodeorg/cli
 *
 * /src/commands/configure.js - Configure Command
 *
 * coded by leny@BeCode
 * started at 25/10/2018
 */

import chalk from "chalk";
import {prompt} from "enquirer";

import reporter from "../core/reporter";
import {get as getConfig, set as setConfig} from "../core/configuration";

const data = require("../../data/open.json");

export const command = "configure";

export const description =
    "Configure your BeCode tool to save your params for future uses.";

export const options = [
    ["-s, --show", "Show your configuration without editing it."],
];

export const action = async cmd => {
    const config = getConfig();

    if (cmd.show) {
        if (!config) {
            reporter.warning(
                "No configuration found. Please answer the following questions:",
            );
        } else {
            reporter.log(
                chalk.underline.yellow("Your configuration:"),
                "\n",
                chalk.bold("Name:"),
                chalk.cyan(config.name),
                "\n",
                chalk.bold("GitHub account:"),
                chalk.cyan(config.github),
                "\n",
                chalk.bold("Promo:"),
                chalk.cyan(config.promo),
                "\n",
                chalk.bold("Coach profile:"),
                chalk.cyan(config.coach ? "yes" : "no"),
            );
            process.exit(0);
        }
    }

    try {
        const values = await prompt([
            {
                type: "input",
                name: "name",
                message: "Your name:",
                initial: (config && config.name) || null,
            },
            {
                type: "input",
                name: "github",
                message: "Your GitHub account:",
                initial: (config && config.github) || null,
            },
            {
                type: "select",
                name: "promo",
                message: "Your promo:",
                choices: Object.keys(data.promo),
                initial: (config && config.promo) || null,
            },
            {
                type: "confirm",
                name: "coach",
                message: "Are you a coach?",
                initial: (config && config.coach) || false,
            },
        ]);

        if (Object.keys(values).length !== 4) {
            throw new Error("Aborted");
        }

        setConfig(values);
    } catch (error) {
        reporter.log("Aborted.");
        process.exit(0);
    }

    reporter.success("Your config has been saved!");
};
