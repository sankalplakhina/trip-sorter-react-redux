import _ from 'lodash';
import * as actionTypes from './actionTypes';
import deals from './deals';

export default function results(state = {}, action = {}) {
	switch (action.type) {
		case actionTypes.FIND_SHORTEST_PATH:
			return updateShortestPath(state, action);

		default:
			return state;
	}
}

function updateShortestPath(state, action) {
	const from = _.upperFirst(action.from.toLowerCase());
	const to = _.upperFirst(action.to.toLowerCase());
	const sort = action.sort.toLowerCase();

	const path = deals.createGraph().findShortestPath(from, to, sort);

	return _.defaults({
		[`${from}-${to}-${sort}`]: (path && path.map((pathInfo) => pathInfo.data)) || false,
	}, state);
}