import {SEARCH_BOOKS} from '../constants/action-types';

const searchReducer = (state = {hasSearched: false}, action) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {...state, hasSearched: action.hasSearched};

    default:
      return state;
  }
};

export default searchReducer;
