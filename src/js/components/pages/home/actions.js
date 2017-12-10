import * as actionTypes from './actionTypes';

export function loadFail(error) {
  return {
    type: actionTypes.LOAD_FAIL,
    error
  };
}

export function loadSuccess(data) {
  return {
    type: actionTypes.LOAD_SUCCESS,
    data
  };
}

export function load() {
    // returning a thunk as this is any async action
    // dispatch and getState and default params from
    // thunk library, client is an extra param required
    // for server as well as client rendering
    // Check createStore where when we set middlewares, we add
    // thunk middleware as thunk.withExtraArgument(client)
    return (dispatch, getState, client) => {

        dispatch({
          type: actionTypes.LOAD
        });

        return client.get('/api/response').then(data => {
            dispatch(loadSuccess(data));
        })
        .catch(error => {
            dispatch(loadFail(error));
        });
    };
}
