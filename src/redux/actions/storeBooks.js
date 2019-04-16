import {STORE_BOOKS} from '../constants/action-types';

export const storeBooks = books => ({
  type: STORE_BOOKS,
  books
});
