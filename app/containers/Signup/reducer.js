import produce from 'immer';
import { GET_USERS } from './constants';

export const initialState = {
  user: '',
  users: [{ id: 1, email: 'local@host.com' }],
};

const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS:
        draft.users = action.payload;
        break;
    }
  });

export default userReducer;
