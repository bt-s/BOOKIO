import {combineReducers} from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import messageReducer from './message';
import userBookReducer from './userBook';
import bookReducer from './book';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
  userBookState: userBookReducer,
  bookState: bookReducer
});

export default rootReducer;
