/* becodeorg/cli;
 *
 * /src/core/configuration.js - Configuration handler
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import {resolve} from "path";
import home from "user-home";
import {existsSync} from "fs";

const configFile = resolve(home, ".becode-config.json");

export const get = () => {
    if (!existsSync(configFile)) {
        return false;
    }

    const config = require(configFile); // eslint-disable-line global-require

    return config;
};
