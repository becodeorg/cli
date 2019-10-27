/* becodeorg/cli
 *
 * /src/post-install.js - Post-install message
 *
 * coded by leny@BeCode
 * started at 15/11/2018
 */

import chalk from "chalk";

const {version} = require(`${__dirname}/../package.json`);

const message = [
    "🎉",
    chalk.green("Yeah!"),
    chalk.cyan("BeCode CLI"),
    chalk.magenta(version),
    "is installed!",
    "\n",
    "\n",
    "You can now run",
    chalk.yellow("becode login"),
    "to connect to the BeCode API.",
    "\n",
    "You can also run",
    chalk.yellow("becode --help"),
    "for more information.",
    "\n",
];

console.log(...message); // eslint-disable-line no-console
