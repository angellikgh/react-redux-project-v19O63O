import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { SIGNUP } from './constants';
import { signupSuccess, signupError } from './actions';
import { push } from 'connected-react-router';

import { API_URL } from '../../utils/config';

export function* signup(action) {

  const requestURL = `${API_URL}/register`
        , method = 'POST'
        , body = JSON.stringify({ ...action.payload })
  try {
    const userData = yield call(request, requestURL, {
      method,
      headers: { 
        'Content-Type': 'application/json'
      },
      body,
    });
    yield put(signupSuccess(userData));
    yield put(push('/login'))
  } catch (err) {
    yield put(signupError(err));
  }
}

export default function* signupSaga() {
  yield takeLatest(SIGNUP, signup);
}
