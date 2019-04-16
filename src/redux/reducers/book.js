import {
  BOOK_TITLE_SUGGESTION_ERROR,
  BOOK_TITLE_SUGGESTION_LOADING,
  BOOK_TITLE_SUGGESTION_SUCCESS
} from '../constants/action-types';

const initialState = {
  isLoading: false,
  isError: false,
  bookTitleSuggestions: []
};

const bookReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case BOOK_TITLE_SUGGESTION_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case BOOK_TITLE_SUGGESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookTitleSuggestions: action.payload
      };
    case BOOK_TITLE_SUGGESTION_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default bookReducer;
