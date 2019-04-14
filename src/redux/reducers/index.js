import {combineReducers} from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import userBookReducer from './userBook';
import bookReducer from './book';
import books from './books';
import search from './search';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  userBookState: userBookReducer,
  bookState: bookReducer,
  booksState: books,
  searchState: search
});

export default rootReducer;
