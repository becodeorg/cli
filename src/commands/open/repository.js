/* becodeorg/cli
 *
 * /src/commands/open/repository.js - Open Repository Subcommand
 *
 * coded by leny@BeCode
 * started at 21/11/2018
 */

import opn from "opn";
import chalk from "chalk";

import reporter from "../../core/reporter";

export default (data, target) => {
    reporter.log(`Opening ${chalk.cyan(target)} repository...`);
    opn(data[target], {wait: false});
};
