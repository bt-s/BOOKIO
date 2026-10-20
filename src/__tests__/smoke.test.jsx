import {describe, it, expect} from 'vitest';

import store from '../redux/store';
import rootReducer from '../redux/reducers';
import sessionReducer from '../redux/reducers/session';
import booksReducer from '../redux/reducers/books';
import {STORE_BOOKS, AUTH_USER_SET} from '../redux/constants/action-types';
import * as ROUTES from '../constants/routes';
import Firebase from '../firebase/firebase';
import {algoliaIndex} from '../algolia';

describe('redux store', () => {
  it('builds with all 2019 slices', () => {
    const state = store.getState();
    expect(state.sessionState).toBeDefined();
    expect(state.booksState).toBeDefined();
    expect(state.coordsState).toBeDefined();
    expect(state.searchState).toBeDefined();
    expect(state.pageState).toBeDefined();
    expect(state.userBookState).toBeDefined();
  });

  it('sets and clears the auth user', () => {
    const user = {uid: 'u1', email: 'a@b.c'};
    const set = sessionReducer(undefined, {type: AUTH_USER_SET, authUser: user});
    expect(set.authUser).toEqual(user);
    const cleared = sessionReducer(set, {type: AUTH_USER_SET, authUser: null});
    expect(cleared.authUser).toBeNull();
  });

  it('stores books', () => {
    const books = [{objectID: '1', title: 'Book'}];
    const state = booksReducer(undefined, {type: STORE_BOOKS, books});
    expect(state.books).toEqual(books);
  });
});

describe('firebase facade', () => {
  it('keeps the 2019 method surface on the modular SDK', () => {
    const fb = new Firebase();
    [
      'doCreateUserWithEmailAndPassword',
      'doSignInWithEmailAndPassword',
      'doSignInWithFacebook',
      'doSignOut',
      'doPasswordReset',
      'doPasswordUpdate',
      'doSendEmailVerification',
      'onAuthUserListener',
      'getMyUID',
      'user',
      'users',
      'book',
      'books',
      'transaction',
      'transactions',
      'getImage',
      'onBooksAddedListener'
    ].forEach(method => expect(typeof fb[method]).toBe('function'));
  });
});

describe('algolia v5 wrapper', () => {
  it('exposes search/saveObject/setSettings/deleteObject', () => {
    ['search', 'saveObject', 'setSettings', 'deleteObject'].forEach(m =>
      expect(typeof algoliaIndex[m]).toBe('function')
    );
  });
});

describe('routes', () => {
  it('keeps the 2019 route table', () => {
    expect(ROUTES.LANDING).toBe('/');
    expect(ROUTES.BOOKS).toBe('/books');
    expect(ROUTES.ACCOUNT).toBe('/account');
    expect(ROUTES.ADD_BOOK).toBe('/add-book');
    expect(ROUTES.BOOK_DETAIL).toBe('/detail/:bookId');
  });
});

describe('root reducer', () => {
  it('produces initial state', () => {
    expect(rootReducer(undefined, {type: '@@INIT'})).toBeTruthy();
  });
});
