/* becodeorg/cli;
 *
 * /src/core/configuration.js - Configuration handler
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import {resolve} from "path";
import home from "user-home";
import {existsSync, writeFileSync, readFileSync} from "fs";

const configFile = resolve(home, ".becode.cli.json");

export const get = () => {
    if (!existsSync(configFile)) {
        return {};
    }

    const rawConfig = readFileSync(configFile, "utf8");
    const config = JSON.parse(rawConfig);

    return config;
};

export const set = (config) => {
    writeFileSync(
        configFile,
        JSON.stringify(Object.assign({}, get(), config), null, 2),
        "utf8",
    );
};
