import axios from 'axios';
import {
  BOOK_TITLE_SUGGESTION_ERROR,
  BOOK_TITLE_SUGGESTION_LOADING,
  BOOK_TITLE_SUGGESTION_SUCCESS
} from '../constants/action-types';

const loading = () => {
  return {
    type: BOOK_TITLE_SUGGESTION_LOADING
  };
};

const success = payload => {
  return {
    type: BOOK_TITLE_SUGGESTION_SUCCESS,
    payload
  };
};

const error = () => {
  return {
    type: BOOK_TITLE_SUGGESTION_ERROR
  };
};

export const fetchBookTitleSuggestions = payload => {
  return dispatch => {
    dispatch(loading());
    axios({
      method: 'GET',
      url: `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/auto_complete?format=json&q=${payload}`
    })
      .then(res => {
        dispatch(success(res.data));
      })
      .catch(err => {
        dispatch(error());
      });
  };
};
