import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILED } from './constants';

export function doSignup(user) {
  return {
    type: SIGNUP,
    payload: user,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}
