import {AUTH_USER_SET} from '../constants/action-types';

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});

const sessionReducer = (state = {authUser: null}, action) => {
  switch (action.type) {
    case AUTH_USER_SET: {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
};

export default sessionReducer;
