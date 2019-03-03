const INITIAL_STATE = {
  authUser: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});

export default function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
}
