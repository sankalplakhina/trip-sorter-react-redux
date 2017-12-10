import { asyncConnect } from 'redux-connect';
import { homeMessageSelector } from './selectors';
import { load } from './actions';
import Home from './home';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();
    	if (true || !state.home.loaded) {
    		return dispatch(load());
    	}
    	return null;
    }
};

function mapStateToProps(state) {
  	return {
  		message: homeMessageSelector(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {};
}

export default asyncConnect([asyncProps], mapStateToProps, mapDispatchToProps)(Home);