/* becodeorg/cli;
 *
 * /src/core/graph.js - GraphQL API utils
 *
 * coded by leny@BeCode
 * started at 27/10/2019
 */

import {GraphQLClient} from "graphql-request";
import {get as getConfig} from "./configuration";

const GRAPH_HOST = "https://graph.becode.org";

const req = (withToken, query, bindings = {}) => {
    const headers = {};

    if (withToken) {
        headers.Authorization = `Bearer ${getConfig().token}`;
    }

    const client = new GraphQLClient(GRAPH_HOST, {headers});

    return client.request(query, bindings);
};

export const request = (...args) => req(false, ...args);

export const userRequest = (...args) => req(true, ...args);
