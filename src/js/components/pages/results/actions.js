import * as actionTypes from './actionTypes';

export function findShortestPath(from, to, sort) {
    sort = sort || "cheapest"; // not using default param because sort could be empty string too
    return {
        type: actionTypes.FIND_SHORTEST_PATH,
        from,
        to,
        sort,
    };
}
