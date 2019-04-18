import React from 'react';
import PropTypes from 'prop-types';

import BookItem from '../../components/BookItem/BookItem';

const SearchResults = props => (
  <div className="search-result">
    {props.books.map((book, ix) => {
      return (
        <BookItem
          key={ix}
          bookId={book.id || book.objectID}
          bookImgSrc={book.imageUrls ? book.imageUrls[0] : book.imageSource}
          bookTitle={book.title}
          bookDescription={book.description}
          type={book.type}
          userAvatar={book.avatar}
          userName={book.owner}
          authorName={book.author}
          distance={book.distance}
          rating={book.rating}
          accountPage={props.accountPage}
        />
      );
    })}
  </div>
);

SearchResults.propTypes = {
  books: PropTypes.array
};

export default SearchResults;
