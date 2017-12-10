export const homeDataSelector = (state) => {
  return state.home.data || {};
};

export const homeMessageSelector = (state) => {
  return homeDataSelector(state).currency;
};