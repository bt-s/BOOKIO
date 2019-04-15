import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {hasLocation, withDistance} from '../helpers/utils';
import {storeBooks} from '../redux/actions/storeBooks';
import {storeCoords} from '../redux/actions/storeCoords';
import * as ROUTES from '../constants/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import Loader from '../components/Loader/Loader';
import SearchResults from '../components/Books/SearchResults';
import FilterGroup from '../components/Books/FilterGroup';
import {index} from '../components/Algolia';

library.add(faPlus);

const _ = require('lodash/core');

const BooksPage = props => {
  const initialCoords = {lat: 0, lng: 0};

  const onFilter = filter => {
    index
      .search({
        filters: filter
      })
      .then(res => {
        props.storeBooks(withDistance(res.hits, props.coords));
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getBooks = () => {
    axios({
      method: 'GET',
      url: `https://us-central1-bookio.cloudfunctions.net/getBooks`
    })
      .then(res => {
        props.storeBooks(withDistance(res.data, props.coords));
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (
    _.isEmpty(props.books) &&
    props.hasSearched === false &&
    hasLocation(props.coords)
  ) {
    getBooks();
  }

  return (
    <React.Fragment>
      <div className="books-tool-bar">
        <FilterGroup
          onFilterUpdate={filters => {
            const strMap = {
              'Books to Borrow': 'to borrow',
              'Books to Have': 'to have'
            };
            if (filters.length > 0) {
              onFilter(
                filters.reduce(
                  (pre, cur) => pre + ' OR type:"' + strMap[cur] + '"',
                  'type:"_____"'
                )
              );
            } else {
              onFilter(
                `type:"${strMap['Books to Have']}" OR type:"${
                  strMap['Books to Borrow']
                }"`
              );
            }
          }}
          filters={['Books to Borrow', 'Books to Have']}
        />
        <Link className="btn btn-add-book" to={ROUTES.ADD_BOOK}>
          <FontAwesomeIcon className="phone" icon="plus" />
          <span className="desktop">Add Book</span>
        </Link>
      </div>
      {!_.isEmpty(props.books) && props.coords !== initialCoords ? (
        <SearchResults books={props.books} />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

BooksPage.propTypes = {
  books: PropTypes.array,
  coords: PropTypes.object,
  storeBooks: PropTypes.func,
  storeCoords: PropTypes.func,
  hasSearched: PropTypes.bool
};

const mapStateToProps = state => ({
  books: state.booksState.books,
  coords: state.coordsState.coords,
  hasSearched: state.searchState.hasSearched
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books)),
  storeCoords: coords => dispatch(storeCoords(coords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksPage);
