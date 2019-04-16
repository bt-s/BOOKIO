import {combineReducers} from 'redux';

import bookReducer from './book';
import booksReducer from './books';
import coordsReducer from './coords';
import searchReducer from './search';
import sessionReducer from './session';
import userReducer from './user';
import userBookReducer from './userBook';

const rootReducer = combineReducers({
  bookState: bookReducer,
  booksState: booksReducer,
  coordsState: coordsReducer,
  searchState: searchReducer,
  sessionState: sessionReducer,
  userState: userReducer,
  userBookState: userBookReducer
});

export default rootReducer;
