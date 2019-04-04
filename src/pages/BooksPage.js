import React from 'react';
import {Link} from 'react-router-dom';

import {BookItemV2} from '../components/BookItem/BookItem';
import Button from '../components/Button/Button';
import * as ROUTES from '../constants/routes';

const Filters = () => (
  <div className="filters">
    <Button type="toggle" className="filter-toggle" text="Give Away Only" />
    <Button type="toggle" className="filter-toggle" text="Near Me" />
    <Button type="toggle" className="filter-toggle" text="Books Only" />
  </div>
);

/**
 * @results
 * should be a list of objects containing information about searched
 * items including name,pic,address,etc.
 *
 */
const SearchResult = props => {
  return (
    <div className="search-result">
      {props.results.map(item => (
        <div>
          <BookItemV2
            key={item.id}
            imageSource={item.imageSource}
            bookTitle={item.bookTitle}
            userAvatar={item.userAvatar}
            userName={item.userName}
            locationName={item.locationName}
            locationDistance={item.locationDistance}
          />
        </div>
      ))}
      <div className="filling-empty-space-childs book-item-v2-container" />
      <div className="filling-empty-space-childs book-item-v2-container" />
    </div>
  );
};

const fakeResults = Array(16).fill({
  bookTitle: 'A Book Without A Looooooooong long long long Name',
  authorName: 'Nobody',
  userName: 'Rick',
  locationName: 'KTH',
  locationDistance: '15m'
});

const BooksPage = props => (
  <div>
    <div className="books-tool-bar">
      <Filters />
      <Link id="btn-add-book" to={ROUTES.ADD_BOOK}>
        Share My Stuff
      </Link>
    </div>
    <SearchResult results={fakeResults} />
  </div>
);

export default BooksPage;
