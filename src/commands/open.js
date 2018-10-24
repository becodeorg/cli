/* becodeorg/cli;
 *
 * /src/commands/open.js - Open Command
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import opn from "opn";
import chalk from "chalk";

import reporter from "../core/reporter";
import {get as getConfig} from "../core/configuration";

const data = require("../../data/open.json");

export const command = "open <target>";

export const description = "Open the specified target in your default browser.";

export const options = [];

export const action = target => {
    const trgt = target.toLowerCase();

    switch (trgt) {
        case "promo":
            const config = getConfig();

            if (!config) {
                reporter.warning(
                    "You need to configure your tool first! Run ",
                    chalk.cyan("becode configure"),
                    "once.",
                );
            }
            break;
        case "central":
        case "watch":
            reporter.log(`Opening ${trgt} repository...`);
            opn(data[trgt], {wait: false});
            break;
        default:
            reporter.error(`Unknown target "${target}" 🤔`);
            break;
    }
};
