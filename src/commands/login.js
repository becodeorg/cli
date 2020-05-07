/* becodeorg/cli
 *
 * /src/commands/login.js - Login Command
 *
 * coded by leny@BeCode
 * started at 27/10/2019
 */

import Koa from "koa";
import chalk from "chalk";
import {prompt} from "enquirer";
import open from "open";
import murmur from "murmur";
import {stringify, parse} from "qs";
import ora from "ora";
import axios from "axios";
import {request, userRequest, getContext} from "../core/graph";
import reporter from "../core/reporter";
import {set as setConfig} from "../core/configuration";

const GITHUB_ID = "eafd08b71984b1ccc214";
const redirect_uri = "http://localhost:57341/auth";

const spinner = ora();

const getGitHubCode = () =>
    new Promise(async (resolve, reject) => {
        const verificationState = murmur.hash128(`${Date.now()}`).hex();

        const githubCallbackHandler = new Koa();

        githubCallbackHandler.use(async (ctx) => {
            if (ctx.request.url.startsWith("/auth")) {
                const {search} = new URL(`http://localhost${ctx.request.url}`);
                const {code, state} = parse(search, {ignoreQueryPrefix: true});

                if (!code) {
                    reject("Can't retrieve code from GitHub OAuth response!");
                    return;
                }

                if (state !== verificationState) {
                    reject("Verification state don't match!");
                    return;
                }

                resolve(code);

                ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BeCode CLI</title>
</head>
<body>
    <p>
        Successfully connected to GitHub. You can now close this window and going back to your terminal.
    </p>

    <script>
        setTimeout(()=>window.close(),3000)
    </script>
</body>
</html>`;
            }
        });

        githubCallbackHandler.listen(57341);

        open(
            `https://github.com/login/oauth/authorize?${stringify({
                client_id: GITHUB_ID,
                redirect_uri,
                scope: "user,repo",
                allow_signup: false,
                state: verificationState,
            })}`,
        );
    });

export const command = "login";

export const description =
    "Login to your account on the BeCode GraphQL API. Required for some commands.";

export const options = [
    ["--local", "Use the local version of the API"],
    ["--staging", "Use the staging version of the API"],
];

export const action = async (cmd) => {
    reporter.log(
        "This script will now open a browser to let you login on GitHub.\nDon't close your terminal until the whole process is done.",
    );

    try {
        const {confirm} = await prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "Login to GraphQL API using GitHub.",
                initial: true,
            },
        ]);

        if (!confirm) {
            throw new Error("Abort");
        }

        spinner.start("Wait for GitHub login…");

        const code = await getGitHubCode();

        spinner.succeed();

        spinner.start("Login to BeCode Graph API…");

        const {
            data: {access_token},
        } = await axios.get(
            `https://oto.becode.xyz/github/${GITHUB_ID}/${code}?${stringify({
                redirect_uri,
            })}`,
        );

        const context = getContext(cmd);

        const {
            loginWithGitHub: {token},
        } = await request(
            `
                mutation loginWithGitHub($access_token: String!) {
                    loginWithGitHub(ghToken: $access_token, useCookie: false) {
                        token
                    }
                }
            `,
            {access_token},
            context,
        );

        spinner.succeed();

        setConfig({[`${context}_token`]: token});

        const {
            consumer: {
                owner: {name, displayname},
            },
        } = await userRequest(
            `
                query consumer {
                    consumer {
                        owner {
                            ... on Person {
                                name
                            }
                            ... on Coach {
                                displayname
                            }
                            ... on Staff {
                                displayname
                            }
                        }
                    }
                }
            `,
            {},
            context,
        );

        reporter.log(
            `You're connected. Welcome, ${chalk.cyan(displayname || name)}!`,
        );

        process.exit(0);
    } catch (error) {
        spinner.fail();
        reporter.die(error.message || error);
    }
};
