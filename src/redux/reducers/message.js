const INITIAL_STATE = {
  messages: null,
  limit: 5
};

const applySetMessages = (state, action) => ({
  ...state,
  messages: action.messages
});

const applySetMessagesLimit = (state, action) => ({
  ...state,
  limit: action.limit
});

export default function messageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'MESSAGES_SET': {
      return applySetMessages(state, action);
    }
    case 'MESSAGES_SET_LIMIT': {
      return applySetMessagesLimit(state, action);
    }
    default:
      return state;
  }
}
