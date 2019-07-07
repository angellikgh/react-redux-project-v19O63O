import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { SIGNUP } from './constants';
import { signupSuccess, signupError } from './actions';

import { API_URL } from '../../utils/config';

export function* signup() {

  const requestURL = `${API_URL}/register`;
  
  try {
    const userData = yield call(request, requestURL);
    yield put(signupSuccess(userData));
  } catch (err) {
    yield put(signupError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* signupSaga() {
  yield takeLatest(SIGNUP, signup);
}
