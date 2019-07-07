import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_USERS } from './constants';
import { usersLoaded, usersError } from './actions';
import { makeSelectUsers } from './selectors';

import { API_URL } from '../../utils/config';

export function* getUsersSaga() {
  const requestURL = `${API_URL}/users`;

  try {
    // Call our request helper (see 'utils/request')
    const users = yield call(request, requestURL);
    yield put(usersLoaded(users));
  } catch (err) {
    yield put(usersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* usersData() {
  yield takeLatest(GET_USERS, getUsersSaga);
}
