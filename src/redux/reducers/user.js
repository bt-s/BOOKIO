import {USER_SET, USERS_SET} from '../constants/action-types';

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users
});

const applySetUser = (state, action) => ({
  ...state,
  users: {
    ...state.users,
    [action.uid]: action.user
  }
});

const userReducer = (state = {users: null}, action) => {
  switch (action.type) {
    case USERS_SET: {
      return applySetUsers(state, action);
    }
    case USER_SET: {
      return applySetUser(state, action);
    }
    default:
      return state;
  }
};

export default userReducer;
