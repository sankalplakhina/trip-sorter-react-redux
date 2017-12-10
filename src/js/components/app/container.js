import { asyncConnect } from 'redux-connect';
import { loadDeals } from './actions';
import App from './app';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();

    	if (!state.app.loaded) {
    		return dispatch(loadDeals());
    	}
    	return null;
    }
};

export default asyncConnect([asyncProps])(App);