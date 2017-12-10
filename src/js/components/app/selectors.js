import _ from 'lodash';
import { createSelector } from 'reselect';

export const getAppData = (state) => {
  return state.app.data || {};
};

export const getCurrency = (state) => {
  return getAppData(state).currency;
};

export const getDeals = (state) => {
  return getAppData(state).deals;
};

export const getDepartueArrivalOptions = createSelector(
	getDeals,
	(deals) => {
		const departures = [];
		const arrivals = [];
		_.forEach(deals, (deal) => {
			departures.push(deal.departure);
			arrivals.push(deal.arrival);
		});
		return {
			from: _.uniq(departures).sort(),
			to: _.uniq(arrivals).sort(),
		};
	}
);