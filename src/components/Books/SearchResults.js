import React from 'react';
import PropTypes from 'prop-types';

import {BookItem} from '../../components/BookItem/BookItem';

const SearchResults = props => {
  console.log(props.id);
  return (
    <div className="search-result">
      {props.books.map((book, ix) => (
        <div key={ix} className="book-item-container">
          <BookItem
            rating={book.rating}
            bookId={book.id}
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
};

SearchResults.propTypes = {
  books: PropTypes.array
};

export default SearchResults;
