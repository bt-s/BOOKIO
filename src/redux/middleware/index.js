import {ADD_BOOK} from '../constants/action-types';

const forbiddenWords = ['spam', 'money'];

export function forbiddenWordsMiddleware({dispatch}) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_BOOK) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );

        if (foundWord.length) {
          return dispatch({type: 'FOUND_BAD_WORD'});
        }
      }
      return next(action);
    };
  };
}
