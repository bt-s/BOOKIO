import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {storeBooks} from '../../redux/actions/storeBooks';

import {index} from '../Algolia';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../constants/routes';

const SearchBase = props => {
  const [searchString, setSearchString] = useState('');

  const handleChange = e => {
    setSearchString(e.target.value);
  };

  const onSearchAlgolia = e => {
    e.preventDefault();

    index
      .search({
        query: searchString
      })
      .then(res => {
        props.storeBooks(res.hits);
      });

    props.history.push(ROUTES.BOOKS);
  };

  return (
    <form className="search-container" onSubmit={onSearchAlgolia}>
      <FontAwesomeIcon icon="search" aria-hidden="true" />
      <input
        name="search"
        placeholder="Search for a book"
        type="text"
        value={searchString}
        onChange={handleChange}
      />
    </form>
  );
};

SearchBase.propTypes = {
  books: PropTypes.array,
  storeBooks: PropTypes.func
};

const mapStateToProps = state => ({
  books: state.booksState.books
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books))
});

const Search = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBase)
);

export default Search;
