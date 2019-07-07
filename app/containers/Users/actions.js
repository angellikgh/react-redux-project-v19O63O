import { GET_USERS, GET_USERS_ERROR } from './constants';

export function getUsers(users) {
  console.log('[Action] > 1', users);
  return {
    type: GET_USERS,
    payload: users,
  };
}

/**
 * Dispatched when loading the user data fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of GET_USERS_ERROR passing the error
 */
export function getUsersError(error) {
  return {
    type: GET_USERS_ERROR,
    error,
  };
}
