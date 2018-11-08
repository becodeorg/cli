/* becodeorg/cli
 *
 * /src/core/utils.js - Common utils
 *
 * coded by leny@BeCode
 * started at 08/11/2018
 */

import gitTopLevel from "git-toplevel";

export const getGitRoot = async () => {
    try {
        return await gitTopLevel();
    } catch (err) {
        return false;
    }
};
