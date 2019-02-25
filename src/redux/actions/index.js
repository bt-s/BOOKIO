import {ADD_BOOK} from '../constants/action-types';

export function getData() {
  return function(dispatch) {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        dispatch({type: 'DATA_LOADED', payload: json});
      });
  };
}

export function addBook(payload) {
  return {type: ADD_BOOK, payload};
}
