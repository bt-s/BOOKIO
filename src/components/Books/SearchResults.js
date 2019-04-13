import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {storeBooks} from '../../redux/actions/storeBooks';

import {BookItem} from '../../components/BookItem/BookItem';

const SearchResults = props => (
  <div className="search-result">
    {props.books.map((book, ix) => (
      <div key={ix} className="book-item-container">
        <BookItem
          bookImgSrc={book.imageUrls ? book.imageUrls[0] : book.imageSource}
          bookTitle={book.title}
          bookDescription={book.description}
          type={book.type}
          userAvatar={book.avatar}
          userName={book.owner}
          authorName={book.author}
          locationDistance={book.locationDistance}
        />
      </div>
    ))}
  </div>
);

SearchResults.propTypes = {
  books: PropTypes.array,
  storeBooks: PropTypes.func
};

const mapStateToProps = state => ({
  books: state.booksState.books
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
