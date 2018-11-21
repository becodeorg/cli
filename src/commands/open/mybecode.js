/* becodeorg/cli
 *
 * /src/commands/open/mybecode.js - Open MyBecode Subcommand
 *
 * coded by leny@BeCode
 * started at 21/11/2018
 */

import opn from "opn";

import reporter from "../../core/reporter";

export default () => {
    reporter.log("Opening MyBeCode...");
    opn("https://my.becode.org", {wait: false});
};
