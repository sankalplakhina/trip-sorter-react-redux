export const getAppData = (state) => {
  return state.app.data || {};
};

export const getCurrency = (state) => {
  return getAppData(state).currency;
};

export const getDeals = (state) => {
  return getAppData(state).deals;
};