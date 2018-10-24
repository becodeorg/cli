/* becodeorg/cli
 *
 * /src/core/reporter.js - Console reporter
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

/* eslint-disable no-console */ // logic as f***

import chalk from "chalk";

class Reporter {
    log(...args) {
        console.log(...args);
    }

    error(...args) {
        console.log("‼️ ", chalk.bold.red("error:"), ...args);
    }
}

export default new Reporter();
