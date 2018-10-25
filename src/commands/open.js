/* becodeorg/cli
 *
 * /src/commands/open.js - Open Command
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import opn from "opn";
import chalk from "chalk";
import inquirer from "inquirer";

import reporter from "../core/reporter";
import {get as getConfig} from "../core/configuration";

const data = require("../../data/open.json");

export const command = "open <target>";

export const description = "Open the specified target in your default browser.";

export const options = [
    ["-c, --choose", "Choose promo instead of using the configured one"],
];

export const action = async (target, cmd) => {
    const trgt = target.toLowerCase();

    switch (trgt) {
        case "promo":
            const config = getConfig();
            let promo;

            if (cmd.choose) {
                const choice = await inquirer.prompt([
                    {
                        type: "list",
                        name: "promo",
                        message: "Choose a promo:",
                        choices: Object.keys(data.promo),
                    },
                ]);

                promo = choice.promo;
            } else if (!config) {
                return reporter.warning(
                    [
                        "You need to configure your tool first! Run ",
                        chalk.green("becode configure"),
                        " once.",
                    ].join(""),
                );
            } else {
                promo = config.promo;
            }
            reporter.log(`Opening ${chalk.cyan(promo)} repository...`);
            opn(data.promo[promo], {wait: false});
            break;

        case "central":
        case "watch":
            reporter.log(`Opening ${chalk.cyan(trgt)} repository...`);
            opn(data[trgt], {wait: false});
            break;

        default:
            reporter.error(`Unknown target "${target}" 🤔`);
            break;
    }
};
