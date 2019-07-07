import produce from 'immer';
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILED } from './constants';

export const initialState = {
  user: null,
  error: null,
};

const signupReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP:
        draft.user = null;
        return {
          ...state,
          user: false
        }
      case SIGNUP_SUCCESS:
        draft.user = action.payload
        return {
          ...state,
          user: false
        }
      case SIGNUP_FAILED:
        draft.error = action.payload
        break;
    }
  });

export default signupReducer;
