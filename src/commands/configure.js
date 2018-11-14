/* becodeorg/cli
 *
 * /src/commands/configure.js - Configure Command
 *
 * coded by leny@BeCode
 * started at 25/10/2018
 */

import {prompt} from "enquirer";

import reporter from "../core/reporter";
import {get as getConfig, set as setConfig} from "../core/configuration";

const data = require("../../data/open.json");

export const command = "configure";

export const description =
    "Configure your BeCode tool to save your params for future uses.";

export const options = [];

export const action = async () => {
    const config = getConfig();

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

    setConfig(values);

    reporter.success("Your config has been saved!");
};
