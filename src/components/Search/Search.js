import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {hasLocation, withDistance} from '../../helpers/locationHelper';
import {storeBooks} from '../../redux/actions/storeBooks';
import {storeCoords} from '../../redux/actions/storeCoords';
import {searchBooks} from '../../redux/actions/searchBooks';

import {index} from '../Algolia';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../constants/routes';

const _ = require('lodash/core');

const SearchBase = props => {
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (!hasLocation(props.coords))
      navigator.geolocation.getCurrentPosition(pos => {
        const gottenCoords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        props.storeCoords(gottenCoords);
        index.search({}).then(res => {
          props.storeBooks(withDistance(res.hits.reverse(), gottenCoords));
        });
      });
  }, []);

  const handleChange = e => {
    setSearchString(e.target.value);
  };

  const onSearchAlgolia = e => {
    e.preventDefault();
    props.searchBooks(true);

    index
      .search({
        query: searchString
      })
      .then(res => {
        !_.isEmpty(res.hits)
          ? props.storeBooks(withDistance(res.hits.reverse(), props.coords))
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
          value={searchString}
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
  hasSearched: state.searchState.hasSearched
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books)),
  storeCoords: coords => dispatch(storeCoords(coords)),
  searchBooks: hasSearched => dispatch(searchBooks(hasSearched))
});

const Search = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBase)
);

export default Search;
