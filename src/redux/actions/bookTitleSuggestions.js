import axios from 'axios';
import {debounce} from '../../helpers/utils';
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
  return debounce(dispatch => {
    dispatch(loading());
    axios({
      method: 'GET',
      header: 'origin',
      url: `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/auto_complete?format=json&q=${payload}`
    })
      .then(res => {
        dispatch(success(res.data));
      })
      .catch(err => {
        dispatch(error());
      });
  }, 500);
};
