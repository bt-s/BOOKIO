// Functional test of the Search component: submitting the search box calls
// the Algolia v5 wrapper, stores hits in Redux and navigates to /books.
// Algolia and geolocation are mocked - no network.
import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {MemoryRouter, Routes, Route} from 'react-router-dom';

const {searchMock} = vi.hoisted(() => ({
  searchMock: vi.fn().mockResolvedValue({
    hits: [{objectID: 'b1', title: 'Dune', location: {lat: 59.3, lon: 18.0}}],
    nbPages: 1
  })
}));

vi.mock('../algolia', () => ({
  algoliaIndex: {search: searchMock}
}));

// jsdom has no geolocation; the component asks for it when no coords exist.
navigator.geolocation = {getCurrentPosition: vi.fn()};

import Search from '../components/Search/Search';
import rootReducer from '../redux/reducers';

const renderSearch = () => {
  const store = configureStore({reducer: rootReducer});
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/books" element={<div>BOOKS PAGE</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  return store;
};

describe('Search component', () => {
  it('queries algolia, stores results and navigates to /books', async () => {
    const store = renderSearch();
    const input = screen.getByPlaceholderText('Search for a book');
    fireEvent.change(input, {target: {value: 'dune', name: 'search'}});
    fireEvent.submit(input.closest('form'));

    await waitFor(() =>
      expect(searchMock).toHaveBeenCalledWith('dune')
    );
    await waitFor(() =>
      expect(screen.getByText('BOOKS PAGE')).toBeTruthy()
    );
    const state = store.getState();
    expect(state.searchState.hasSearched).toBe(true);
    expect(state.booksState.books).toHaveLength(1);
    expect(state.booksState.books[0].title).toBe('Dune');
  });

  it('stores nothing when algolia returns zero hits', async () => {
    searchMock.mockResolvedValueOnce({hits: [], nbPages: 0});
    const store = renderSearch();
    const input = screen.getByPlaceholderText('Search for a book');
    fireEvent.change(input, {target: {value: 'zzzz', name: 'search'}});
    fireEvent.submit(input.closest('form'));
    await waitFor(() => expect(searchMock).toHaveBeenCalledWith('zzzz'));
    await waitFor(() =>
      expect(store.getState().searchState.hasSearched).toBe(true)
    );
    expect(store.getState().booksState.books).toBeUndefined();
  });
});
