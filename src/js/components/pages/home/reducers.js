import _ from 'lodash';
import * as actionTypes from './actionTypes';

const initialState = {
  loaded: false,
  loading: false
};

export default function home(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LOAD:
      return {
        loaded: false,
        loading: true,
        data: {}
      };
    case actionTypes.LOAD_SUCCESS:
      return {
        loaded: true,
        loading: false,
        data: action.data
      };
    case actionTypes.LOAD_FAIL:
      return {
        loaded: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}