import {INCREMENT_PAGE, DECREMENT_PAGE} from '../constants/action-types';

const pageReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_PAGE:
      return state + 1;

    case DECREMENT_PAGE:
      return state - 1;

    default:
      return state;
  }
};

export default pageReducer;
