import {STORE_SEARCH_QUERY} from '../constants/action-types';

export const storeSearchQuery = query => ({
  type: STORE_SEARCH_QUERY,
  query
});
