/* becodeorg/cli
 *
 * /src/commands/open.js - Open Command
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import {select} from "enquirer";

import reporter from "../core/reporter";
import {get as getConfig} from "../core/configuration";

import openGithub from "./open/github";
import openMyBecode from "./open/mybecode";
import openPromo from "./open/promo";
import openRepository from "./open/repository";

const data = require("../../data/open.json");

export const command = "open [target]";

export const description = "Open the specified target in your default browser.";

export const options = [
    ["-c, --choose", "Choose promo instead of using the configured one"],
];

export const action = async (target, cmd) => {
    let targetKey = (target || "").toLowerCase();

    const config = getConfig();

    const myBecodeTarget = [openMyBecode, "Open MyBecode"];

    const repositoryTarget = (key, name) => [
        openRepository.bind(null, data, key),
        `Open ${name} repository`,
    ];

    const targets = {
        github: [
            openGithub.bind(null, config),
            "Open your GitHub profile (or Github home if not configured)",
        ],
        my: myBecodeTarget,
        mybecode: myBecodeTarget,
        promo: [
            openPromo.bind(null, cmd, config, data),
            "Open your promo repository",
        ],
        central: repositoryTarget("central", "Central"),
        watch: repositoryTarget("central", "Watch"),
    };

    try {
        if (!Object.keys(targets).includes(targetKey)) {
            reporter.warning("Unknown or no target given!");

            targetKey = await select({
                name: "target",
                message: "Choose a target:",
                choices: Object.entries(targets)
                    .filter(([name]) => name !== "my")
                    .map(([name, [, hint]]) => ({
                        name,
                        message: name,
                        hint,
                    })),
            });
        }

        const [targetCommand] = targets[targetKey];

        await targetCommand();
    } catch (error) {
        reporter.log("Aborted.");
    }
};
