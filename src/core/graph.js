/* becodeorg/cli;
 *
 * /src/core/graph.js - GraphQL API utils
 *
 * coded by leny@BeCode
 * started at 27/10/2019
 */

import {GraphQLClient} from "graphql-request";
import {get as getConfig} from "./configuration";

const GRAPH_HOST = {
    local: "http://localhost:9080/dev",
    staging: "https://graph.becode.xyz",
    prod: "https://graph.becode.org",
};

const req = (withToken, query, bindings = {}, context = "prod") => {
    const headers = {};

    if (withToken) {
        const token = getConfig()[`${context}_token`];

        if (!token) {
            throw new Error(
                `Missing token: you're not connected. Please use "becode login" before running this command.`,
            );
        }
        headers.Authorization = `Bearer ${getConfig()[`${context}_token`]}`;
    }

    const client = new GraphQLClient(GRAPH_HOST[context], {headers});

    return client.request(query, bindings);
};

export const request = (...args) => req(false, ...args);

export const userRequest = (...args) => req(true, ...args);

export const getContext = (cmd) => {
    if (cmd.local) {
        return "local";
    }
    if (cmd.staging) {
        return "staging";
    }

    return "prod";
};
