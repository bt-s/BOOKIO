// Verifies the v5 wrapper maps the 2019 call shapes onto the algoliasearch
// v5 client API. The client itself is mocked - no network, no keys.
import {describe, it, expect, vi, beforeEach} from 'vitest';

const {searchSingleIndex, saveObject, setSettings, deleteObject} = vi.hoisted(
  () => ({
    searchSingleIndex: vi.fn().mockResolvedValue({hits: [], nbPages: 1}),
    saveObject: vi.fn().mockResolvedValue({}),
    setSettings: vi.fn().mockResolvedValue({}),
    deleteObject: vi.fn().mockResolvedValue({})
  })
);

vi.mock('algoliasearch', () => ({
  algoliasearch: vi.fn(() => ({
    searchSingleIndex,
    saveObject,
    setSettings,
    deleteObject
  }))
}));

import {algoliaIndex} from '../algolia';

beforeEach(() => {
  searchSingleIndex.mockClear();
  saveObject.mockClear();
  setSettings.mockClear();
  deleteObject.mockClear();
});

describe('algolia v5 wrapper', () => {
  it('search maps query + options into searchSingleIndex searchParams', async () => {
    await algoliaIndex.search('dune', {filters: 'type:"lend"', page: 0});
    expect(searchSingleIndex).toHaveBeenCalledWith({
      indexName: 'books',
      searchParams: {query: 'dune', filters: 'type:"lend"', page: 0}
    });
  });

  it('search works with an empty query (browse all)', async () => {
    const res = await algoliaIndex.search('');
    expect(searchSingleIndex).toHaveBeenCalledWith({
      indexName: 'books',
      searchParams: {query: ''}
    });
    expect(res.nbPages).toBe(1);
  });

  it('saveObject/setSettings/deleteObject target the books index', async () => {
    await algoliaIndex.saveObject({objectID: '1', title: 'T'});
    expect(saveObject).toHaveBeenCalledWith({
      indexName: 'books',
      body: {objectID: '1', title: 'T'}
    });
    await algoliaIndex.setSettings({searchableAttributes: ['title']});
    expect(setSettings).toHaveBeenCalledWith({
      indexName: 'books',
      indexSettings: {searchableAttributes: ['title']}
    });
    await algoliaIndex.deleteObject('1');
    expect(deleteObject).toHaveBeenCalledWith({
      indexName: 'books',
      objectID: '1'
    });
  });
});
