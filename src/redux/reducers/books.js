import {STORE_BOOKS} from '../constants/action-types';

const booksReducer = (state = {books: []}, action) => {
  switch (action.type) {
    case STORE_BOOKS:
      return {...state, books: action.books};

    default:
      return state;
  }
};

export default booksReducer;
