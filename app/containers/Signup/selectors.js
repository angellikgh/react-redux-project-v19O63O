import { createSelector } from 'reselect';
import { initialState } from './reducer';

const state = state => state.home || initialState;

const userSelector = () =>
  createSelector(
    state,
    state => state.username,
  );

export { 
  state, 
  userSelector,
};
