import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {storeBooks} from '../redux/actions/storeBooks';

import axios from 'axios';

import Loader from '../components/Loader/Loader';
import SearchResults from '../components/Books/SearchResults';
import BooksFilters from '../components/Books/BooksFilters';

import {index} from '../components/Algolia';

import * as ROUTES from '../constants/routes';

const _ = require('lodash/core');

const BooksPage = props => {
  const [borrowFilterOn, setBorrowFilterOn] = useState(false);
  const [haveFilterOn, setHaveFilterOn] = useState(false);

  const onFilter = filter => {
    index
      .search({
        filters: `type:"${filter}"`
      })
      .then(res => {
        props.storeBooks(res.hits);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onBorrowFilter = e => {
    !borrowFilterOn ? onFilter('to borrow') : getBooks();
    setBorrowFilterOn(!borrowFilterOn);
  };

  const onHaveFilter = e => {
    !haveFilterOn ? onFilter('to have') : getBooks();
    setHaveFilterOn(!haveFilterOn);
  };

  const getBooks = () => {
    axios({
      method: 'GET',
      url: `https://us-central1-bookio.cloudfunctions.net/getBooks`
    })
      .then(res => {
        props.storeBooks(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (_.isEmpty(props.books) && props.searchBool === false) {
    getBooks();
  }

  return (
    <React.Fragment>
      <div className="books-tool-bar">
        <BooksFilters
          onBorrowFilter={onBorrowFilter}
          onHaveFilter={onHaveFilter}
        />
        <Link className="btn btn-add-book" to={ROUTES.ADD_BOOK}>
          Add Book
        </Link>
      </div>
      {!_.isEmpty(props.books) ? (
        <SearchResults books={props.books} />
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

BooksPage.propTypes = {
  books: PropTypes.array,
  storeBooks: PropTypes.func,
  searchBool: PropTypes.bool
};

const mapStateToProps = state => ({
  books: state.booksState.books,
  searchBool: state.searchState
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksPage);
