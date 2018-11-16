#!/usr/bin/env node
/* becodeorg/cli
 *
 * /src/index.js - Main entry point
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import commander from "commander";
import commands from "./commands";

const {version} = require(`${__dirname}/../package.json`);

commander.version(version);

commands.forEach(({command, description, options, action}) => {
    const cmd = commander.command(command);

    description && cmd.description(description);

    Array.isArray(options) &&
        options.length &&
        options.forEach(opt => cmd.option(...opt));

    cmd.action(action);
});

commander.parse(process.argv);

!process.argv.slice(2).length && commander.outputHelp();
