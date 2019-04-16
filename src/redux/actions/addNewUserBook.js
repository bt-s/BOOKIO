import {
  ADD_NEW_USER_BOOK_ERROR,
  ADD_NEW_USER_BOOK_LOADING,
  ADD_NEW_USER_BOOK_SUCCESS,
  CHANGE_NEW_BOOK
} from '../constants/action-types';

const loading = () => {
  return {
    type: ADD_NEW_USER_BOOK_LOADING
  };
};

const success = () => {
  return {
    type: ADD_NEW_USER_BOOK_SUCCESS
  };
};

const error = () => {
  return {
    type: ADD_NEW_USER_BOOK_ERROR
  };
};

export const changeNewBook = payload => {
  return {
    type: CHANGE_NEW_BOOK,
    payload
  };
};

export const addNewUserBook = payload => {
  return dispatch => {
    switch (payload) {
      case 'loading':
        dispatch(loading());
        break;
      case 'error':
        dispatch(error());
        break;
      case 'success':
        dispatch(success());
        break;
      default:
        dispatch(success());
    }
  };
};
