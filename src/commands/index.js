/* becodeorg/cli;
 *
 * /src/commands/index.js - Commands list
 *
 * coded by leny@BeCode
 * started at 24/10/2018
 */

import * as login from "./login";
import * as loginAs from "./login-as";
import * as logout from "./logout";
import * as whoami from "./whoami";
import * as generate from "./generate";
import * as open from "./open";

export default [login, loginAs, logout, whoami, generate, open];
