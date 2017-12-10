/* eslint import/no-extraneous-dependencies: 0, global-require: 0, no-underscore-dangle: 0 */

import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from 'src/js/reducers';

export function createStore(client, history, data) {

  const middleware = [
    thunk.withExtraArgument(client),
    routerMiddleware(history)
  ];

  let finalCreateStore;
  if (process.env.NODE_ENV === 'development' && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../components/devTools');

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      global.devToolsExtension? global.devToolsExtension() : DevTools.instrument(),
      persistState(global.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducers, data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(reducers, () => {
      store.replaceReducer(reducers);
    });
  }

  return store;
}