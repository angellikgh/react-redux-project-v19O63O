import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_USERS } from './constants';
import { getUsers, getUsersError } from './actions';
import { makeSelectUsers } from './selectors';

import { API_URL } from '../../utils/config';

export function* getUsersSaga() {
  // Select username from store
  const username = yield select(makeSelectUsers());
  const requestURL = `${API_URL}/users`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(getUsers(repos, username));
  } catch (err) {
    yield put(getUsersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(GET_USERS, getUsersSaga);
  // yield takeLatest(GET_USER, getUser)
}
