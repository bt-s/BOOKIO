const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;

const algolia = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = algolia.initIndex('books');

export {algolia, index};
