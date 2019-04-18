import {STORE_SEARCH_QUERY} from '../constants/action-types';

const searchQueryReducer = (state = {query: ''}, action) => {
  switch (action.type) {
    case STORE_SEARCH_QUERY:
      return {...state, query: action.query};

    default:
      return state;
  }
};

export default searchQueryReducer;
