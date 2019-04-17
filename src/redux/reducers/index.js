import {combineReducers} from 'redux';

import bookReducer from './book';
import booksReducer from './books';
import coordsReducer from './coords';
import pageReducer from './page';
import searchReducer from './search';
import searchQueryReducer from './searchQuery';
import sessionReducer from './session';
import userReducer from './user';
import userBookReducer from './userBook';

const rootReducer = combineReducers({
  bookState: bookReducer,
  booksState: booksReducer,
  coordsState: coordsReducer,
  pageState: pageReducer,
  searchState: searchReducer,
  searchQueryState: searchQueryReducer,
  sessionState: sessionReducer,
  userState: userReducer,
  userBookState: userBookReducer
});

export default rootReducer;
