/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          currentUser: null
        }
        break;
      case LOGIN_SUCCESS:
        
      break;
      case LOGIN_FAILED:
        
      break;
    }
  });

export default appReducer;
