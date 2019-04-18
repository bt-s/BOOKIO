import {
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  GO_TO_PAGE
} from '../constants/action-types';

const pageReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_PAGE:
      return state + 1;

    case DECREMENT_PAGE:
      return state - 1;

    case GO_TO_PAGE:
      return action.page;

    default:
      return state;
  }
};

export default pageReducer;
