import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {hasLocation, withDistance} from '../helpers/locationHelper';
import {storeBooks} from '../redux/actions/storeBooks';
import {storeCoords} from '../redux/actions/storeCoords';
import {incrementPage, decrementPage} from '../redux/actions/storePage';
import {storeSearchQuery} from '../redux/actions/storeSearchQuery';

import * as ROUTES from '../constants/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import SearchResults from '../components/Books/SearchResults';
import FilterGroup from '../components/Books/FilterGroup';
import {index} from '../components/Algolia';

library.add(faPlus);

const _ = require('lodash/core');

const BooksPage = props => {
  useEffect(() => {
    onFilter(props.query);
  }, []);

  const initialCoords = {lat: 0, lng: 0};

  const onFilter = filter => {
    props.storeSearchQuery(filter);

    index
      .search({
        filters: filter,
        page: props.page
      })
      .then(res => {
        console.log(res);
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

  const noBooksFound = (
    <div className="no-books-found">
      <h2>Whooooops...!</h2>
      <p>
        You must have an extraordinary taste! Unforuntately no one has the book
        that you are looking for on offer at the moment.
      </p>
    </div>
  );

  if (
    _.isEmpty(props.books) &&
    props.hasSearched === false &&
    hasLocation(props.coords)
  ) {
    getBooks();
  }

  const depaginate = () => {
    props.decrementPage(props.page);
  };

  const paginate = () => {
    props.incrementPage(props.page);
    onFilter(props.query);
  };

  return (
    <React.Fragment>
      <div className="books-tool-bar">
        <FilterGroup
          onFilterUpdate={filters => {
            const strMap = {
              'Books to Borrow': 'lend',
              'Books to Have': 'give'
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
        <React.Fragment>
          <SearchResults books={props.books} />
          <Button
            className="btn"
            type="button"
            onClick={depaginate}
            text="Depaginate"
          />
          <Button
            className="btn"
            type="button"
            onClick={paginate}
            text="Paginate"
          />
        </React.Fragment>
      ) : typeof props.books === 'undefined' ? (
        <div>{noBooksFound}</div>
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
  hasSearched: state.searchState.hasSearched,
  page: state.pageState,
  query: state.searchQueryState.query
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books)),
  storeCoords: coords => dispatch(storeCoords(coords)),
  storeSearchQuery: query => dispatch(storeSearchQuery(query)),
  incrementPage: page => dispatch(incrementPage(page)),
  decrementPage: page => dispatch(decrementPage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksPage);
