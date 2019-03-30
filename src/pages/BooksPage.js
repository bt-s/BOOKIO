import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Dropdown from '../components/Dropdown/Dropdown';
import BookItem from '../components/BookItem/BookItem';
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
  console.log(props, 'in searchresults');

  return (
    <div className="search-result">
      {props.results.map(item => (
        <BookItem
          key={item.id}
          imageSource={item.imageSource}
          bookTitle={item.bookTitle}
          userAvatar={item.userAvatar}
          userName={item.userName}
          locationName={item.locationName}
          locationDistance={item.locationDistance}
        />
      ))}
    </div>
  );
};

const fakeResults = Array(16).fill({
  bookTitle: 'A Book Without A Name',
  authorName: 'Nobody',
  userName: 'Rick',
  locationName: 'KTH',
  locationDistance: '15m'
});

const BooksPage = props => (
  <div>
    <br />
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
