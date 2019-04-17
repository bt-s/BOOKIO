import {INCREMENT_PAGE, DECREMENT_PAGE} from '../constants/action-types';

export const incrementPage = page => ({
  type: INCREMENT_PAGE,
  page
});

export const decrementPage = page => ({
  type: DECREMENT_PAGE,
  page
});
