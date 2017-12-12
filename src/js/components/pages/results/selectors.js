import _ from 'lodash';

export const getResults = (state) => state.results;

export const getShortestPath = (state, fromQ = "", toQ = "", sortQ) => {
	const from = _.upperFirst(fromQ.toLowerCase());
	const to = _.upperFirst(toQ.toLowerCase());
	const sort = (sortQ && sortQ.toLowerCase()) || "cheapest";

	return _.get(getResults(state), `${from}-${to}-${sort}`, null);
}