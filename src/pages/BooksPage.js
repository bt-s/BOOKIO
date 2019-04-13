import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

import {BookItem} from '../components/BookItem/BookItem';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';

import * as ROUTES from '../constants/routes';

const Filters = props => {
  return (
    <div className="filters">
      <Button
        onClick={props.onBorrowFilter}
        type="toggle"
        className="filter-toggle"
        text="Books To Borrow"
      />
      <Button
        onClick={props.onHaveFilter}
        type="toggle"
        className="filter-toggle"
        text="Books To Have"
      />
    </div>
  );
};

const SearchResult = props => {
  const booksFilter = filter => {
    const filterFunc = props.results.reduce((filtered, book) => {
      if (book.type === filter) {
        filtered.push(book);
      }
      return filtered;
    }, []);
    return filterFunc;
  };

  let results;
  if (props.borrowFilter && props.haveFilter) {
    results = props.results;
  } else if (props.borrowFilter) {
    results = booksFilter('to borrow');
  } else if (props.haveFilter) {
    results = booksFilter('to have');
  } else {
    results = props.results;
  }

  return (
    <React.Fragment>
      <div className="search-result">
        {results.map((book, ix) => (
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
    </React.Fragment>
  );
};

const BooksPage = props => {
  const [hasBooks, setHasBooks] = useState(false);
  const [books, setBooks] = useState([]);
  const [borrowFilter, setBorrowFilter] = useState(false);
  const [haveFilter, setHaveFilter] = useState(false);

  const onBorrowFilter = e => {
    setBorrowFilter(!borrowFilter);
  };

  const onHaveFilter = e => {
    setHaveFilter(!haveFilter);
  };

  const getBooks = () => {
    axios({
      method: 'GET',
      url: `https://us-central1-bookio.cloudfunctions.net/getBooks`
    })
      .then(res => {
        setHasBooks(true);
        setBooks(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (!hasBooks) getBooks();

  return (
    <div>
      <div className="books-tool-bar">
        <Filters onBorrowFilter={onBorrowFilter} onHaveFilter={onHaveFilter} />
        <Link className="btn btn-add-book" to={ROUTES.ADD_BOOK}>
          Add Book
        </Link>
      </div>
      {hasBooks ? (
        <SearchResult
          results={books}
          haveFilter={haveFilter}
          borrowFilter={borrowFilter}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default BooksPage;
