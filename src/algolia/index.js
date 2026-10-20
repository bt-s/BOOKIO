import {algoliasearch} from 'algoliasearch';

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
);

// algoliasearch v5: single-flight index helpers via client methods
export const algoliaIndex = {
  search: (query, options) =>
    client.searchSingleIndex({indexName: 'books', searchParams: {query, ...options}}),
  saveObject: record =>
    client.saveObject({indexName: 'books', body: record}),
  setSettings: settings =>
    client.setSettings({indexName: 'books', indexSettings: settings}),
  // NOTE: writes/deletes need an admin-capable key and must move
  // server-side (see MODERNIZATION.md); kept for parity with 2019 behavior.
  deleteObject: objectID =>
    client.deleteObject({indexName: 'books', objectID})
};

export default client;
