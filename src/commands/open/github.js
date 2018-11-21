/* becodeorg/cli
 *
 * /src/commands/open/github.js - Open Github Subcommand
 *
 * coded by leny@BeCode
 * started at 21/11/2018
 */

import opn from "opn";
import chalk from "chalk";

import reporter from "../../core/reporter";

export default config => {
    if (config && config.github) {
        reporter.log(`Opening your ${chalk.cyan("GitHub profile")}...`);
        opn(`https://github.com/${config.github}`, {wait: false});
    } else {
        reporter.log(`Opening ${chalk.cyan("GitHub")}...`);
        opn("https://github.com", {wait: false});
    }
};
