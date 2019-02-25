import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return {books: state.books};
};

const ConnectedList = ({books}) => (
  <ul>
    {books.map(book => (
      <li key={book.id}>{book.title}</li>
    ))}
  </ul>
);

ConnectedList.propTypes = {
  books: PropTypes.array
};

const List = connect(mapStateToProps)(ConnectedList);

export default List;
