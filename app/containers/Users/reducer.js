import produce from 'immer';
import { GET_USERS, USERS_LOADED, USERS_ERROR } from './constants';

export const initialState = {
  user: '',
  users: [],
};

const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS:
        draft.error = null;
        draft.users = [];
        break;
      case USERS_LOADED:
        draft.users = action.users;
        break;
      case USERS_ERROR:
        draft.error = action.error
        break;
    }
  });

export default userReducer;
