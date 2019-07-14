import { GET_USERS, USERS_LOADED, USERS_ERROR } from './constants';

export function getUsers(users) {
  return {
    type: GET_USERS
  };
}

export function usersLoaded(users) {
  return {
    type: USERS_LOADED,
    users,
  };
}

/**
 * Dispatched when loading the user data fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of GET_USERS_ERROR passing the error
 */
export function usersError(error) {
  return {
    type: USERS_ERROR,
    error,
  };
}
