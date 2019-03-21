// import axios from 'axios';
import {
  // ADD_NEW_USER_BOOK_ERROR,
  // ADD_NEW_USER_BOOK_LOADING,
  // ADD_NEW_USER_BOOK_SUCCESS,
  CHANGE_NEW_BOOK_TITLE,
  CHANGE_NEW_BOOK
} from '../constants/action-types';

// const loading = () => {
//   return {
//     type: ADD_NEW_USER_BOOK_LOADING
//   };
// };

// const success = () => {
//   return {
//     type: ADD_NEW_USER_BOOK_SUCCESS
//   };
// };

// const error = () => {
//   return {
//     type: ADD_NEW_USER_BOOK_ERROR
//   };
// };

export const changeNewBookTitle = payload => {
  return {
    type: CHANGE_NEW_BOOK_TITLE,
    payload
  };
};

export const changeNewBook = payload => {
  return {
    type: CHANGE_NEW_BOOK,
    payload
  }
}

export const addNewUserBook = payload => {
  return dispatch => {
    /**  TODO: Call API to add new book using axios */
    console.warn('[ADD_NEW_BOOK] Calling API to add New Book');
    /** Here is the example to call API */
    // dispatch(loading());
    // axios({
    //   method: 'POST',
    //   url: `Link to the API`,
    //   data: payload
    // })
    //   .then((res) => {
    //     dispatch(success());
    //   })
    //   .catch((err) => {
    //     dispatch(error());
    //   })
  };
};
