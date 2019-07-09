import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

export function doLogin(user) {
  return {
    type: LOGIN,
    payload: user,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}
