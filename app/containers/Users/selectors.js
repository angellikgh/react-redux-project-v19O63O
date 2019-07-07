import { createSelector } from 'reselect';
import { initialState } from './reducer';

const state = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    state,
    state => state.username,
  );

const makeSelectUsers = () =>
  createSelector(
    state,
    state => state.users,
  );

export { state, makeSelectUsername, makeSelectUsers };
