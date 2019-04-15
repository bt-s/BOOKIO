const search = (state = {hasSearched: false}, action) => {
  switch (action.type) {
    case 'SEARCH_BOOKS':
      return {...state, hasSearched: action.hasSearched};

    default:
      return state;
  }
};

export default search;
