const search = (state = false, action) => {
  switch (action.type) {
    case 'SEARCH_BOOKS':
      return {...state, state: action.searchBool};

    default:
      return state;
  }
};

export default search;
