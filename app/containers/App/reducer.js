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
          currentUser: null,
          loading: true,
        }
        break;
      case LOGIN_SUCCESS:
        const token = action.auth_token
        localStorage.setItem("token", token);
        
        return {
          ...state,
          loading: false,
        }
      break;
      case LOGIN_FAILED:
        return {
          ...state,
          loading: false,
          error: action.error,
        }
      break;
    }
  });

export default appReducer;
