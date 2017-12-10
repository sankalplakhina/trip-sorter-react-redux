import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import app from 'src/js/components/app/reducers';

// root reducer
const reducers = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  app
});

export default reducers;