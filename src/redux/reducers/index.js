import {ADD_BOOK, DATA_LOADED} from '../constants/action-types';

const initialState = {
  books: [],
  remoteBooks: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_BOOK) {
    return Object.assign({}, state, {
      books: state.books.concat(action.payload)
    });
  }

  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteBooks: state.remoteBooks.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
