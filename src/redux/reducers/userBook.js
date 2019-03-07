import {
  ADD_NEW_USER_BOOK_ERROR,
  ADD_NEW_USER_BOOK_LOADING,
  ADD_NEW_USER_BOOK_SUCCESS
} from '../constants/action-types'

const initialState = {
  isLoading: false,
  isError: false,
  userBooks: [],
};

export default function reducers( state = {...initialState}, action) {
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

      };
    case ADD_NEW_USER_BOOK_ERROR: 
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    default:
      return state;
  };
};
