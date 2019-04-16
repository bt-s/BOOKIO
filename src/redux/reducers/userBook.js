import {
  ADD_NEW_USER_BOOK_ERROR,
  ADD_NEW_USER_BOOK_LOADING,
  ADD_NEW_USER_BOOK_SUCCESS,
  CHANGE_NEW_BOOK
} from '../constants/action-types';

const initialState = {
  isLoading: false,
  isError: false,
  userBooks: [],
  newBook: {
    title: '',
    rating: 0,
    author: '',
    imageUrls: '',
    type: ''
  }
};

const userBookReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case ADD_NEW_USER_BOOK_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case ADD_NEW_USER_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newBook: {
          title: '',
          rating: '',
          author: '',
          imageUrls: '',
          type: ''
        }
      };
    case ADD_NEW_USER_BOOK_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case CHANGE_NEW_BOOK:
      return {
        ...state,
        newBook: {
          ...state.newBook,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default userBookReducer;
