/* becodeorg/cli
 *
 * /src/commands/open/promo.js - Open Promo Subcommand
 *
 * coded by leny@BeCode
 * started at 21/11/2018
 */

import opn from "opn";
import chalk from "chalk";
import {select} from "enquirer";

import reporter from "../../core/reporter";

export default (cmd, config, data) => {
    let promo;

    if (cmd.choose) {
        try {
            promo = await select({
                name: "promo",
                message: "Choose a promo:",
                choices: Object.keys(data.promo),
            });
        } catch (error) {
            reporter.log("Aborted");
            process.exit(0);
        }
    } else if (!config) {
        reporter.warning(
            [
                "You need to configure your tool first! Run ",
                chalk.green("becode configure"),
                " once.",
            ].join(""),
        );
        process.exit(0);
    } else {
        promo = config.promo;
    }
    reporter.log(`Opening ${chalk.cyan(promo)} repository...`);
    opn(data.promo[promo], {wait: false});
};
