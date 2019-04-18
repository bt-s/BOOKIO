import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {hasLocation, withDistance} from '../../helpers/locationHelper';
import {storeBooks} from '../../redux/actions/storeBooks';
import {storeCoords} from '../../redux/actions/storeCoords';
import {searchBooks} from '../../redux/actions/searchBooks';
import {storeSearchQuery} from '../../redux/actions/storeSearchQuery';

import {index} from '../Algolia';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../constants/routes';

const _ = require('lodash/core');

const SearchBase = props => {
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    if (!hasLocation(props.coords))
      navigator.geolocation.getCurrentPosition(pos => {
        props.storeCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      });
  }, []);

  const handleChange = e => {
    setCurrentQuery(e.target.value);
  };

  const onSearchAlgolia = e => {
    e.preventDefault();
    props.storeSearchQuery(currentQuery);
    props.searchBooks(true);

    index
      .search({
        query: currentQuery
      })
      .then(res => {
        !_.isEmpty(res.hits)
          ? props.storeBooks(withDistance(res.hits, props.coords))
          : props.storeBooks();
      });

    props.history.push(ROUTES.BOOKS);
  };

  return (
    <div className="search-wrapper">
      <FontAwesomeIcon icon="search" aria-hidden="true" />
      <form className="search-container" onSubmit={onSearchAlgolia}>
        <input
          name="search"
          placeholder="Search for a book"
          type="text"
          value={currentQuery}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

SearchBase.propTypes = {
  books: PropTypes.array,
  coords: PropTypes.object,
  hasSearched: PropTypes.bool,
  storeBooks: PropTypes.func,
  storeCoords: PropTypes.func,
  searchBooks: PropTypes.func
};

const mapStateToProps = state => ({
  books: state.booksState.books,
  coords: state.coordsState.coords,
  query: state.searchQueryState.query,
  hasSearched: state.searchState.hasSearched
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books)),
  storeCoords: coords => dispatch(storeCoords(coords)),
  searchBooks: hasSearched => dispatch(searchBooks(hasSearched)),
  storeSearchQuery: query => dispatch(storeSearchQuery(query))
});

const Search = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBase)
);

export default Search;
