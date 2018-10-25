/* becodeorg/cli
 *
 * /src/commands/configure.js - Configure Command
 *
 * coded by leny@BeCode
 * started at 25/10/2018
 */

import inquirer from "inquirer";

import reporter from "../core/reporter";
import {get as getConfig, set as setConfig} from "../core/configuration";

const data = require("../../data/open.json");

export const command = "configure";

export const description =
    "Configure your BeCode tool to save your params for future uses.";

export const options = [];

export const action = async () => {
    const config = getConfig();

    const values = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Your name:",
            default: (config && config.name) || null,
        },
        {
            type: "input",
            name: "github",
            message: "Your GitHub account:",
            default: (config && config.github) || null,
        },
        {
            type: "list",
            name: "promo",
            message: "Your promo:",
            choices: Object.keys(data.promo),
            default: (config && config.promo) || null,
        },
    ]);

    setConfig(values);

    reporter.success("Your config has been saved!");
};
