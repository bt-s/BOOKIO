import {SEARCH_BOOKS} from '../constants/action-types';

export const searchBooks = hasSearched => ({
  type: SEARCH_BOOKS,
  hasSearched
});
