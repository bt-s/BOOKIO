import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Dropdown from '../components/Dropdown/Dropdown';
import BookItem from '../components/BookItem/BookItem';
import * as ROUTES from '../constants/routes';

const Filters = () => (
  <div id="filters">
    {/* Dropdown should be changed to filter Component later */}
    <Dropdown
      classes="filter"
      headerTitle="Give Away"
      items={[{title: 'Lending Out'}]}
    />
    <Dropdown
      classes="filter"
      headerTitle="Distance"
      items={[{title: 'Nearest'}, {title: 'Farest'}]}
    />
    <Dropdown
      classes="filter"
      headerTitle="Book Only"
      items={[{title: 'All Stuff'}, {title: 'Book Only'}, {title: 'Non Book'}]}
    />
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
    <div class="search-result">
      {props.results.map(item => (
        <BookItem
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

const Trending = () => (
  <div id="trending-board">
    <h1>Trending Now</h1>
    <h2>Lord of Ring</h2>
    <h2>Inevitable by KK</h2>
  </div>
);

const BooksPage = props => (
  <div>
    <br />
    <Filters />
    <br />
    <div id="result-trending">
      <SearchResult results={fakeResults} />
      <div id="btn-and-trending">
        <Link id="btn-add-book" to={ROUTES.ADD_BOOK}>
          Share My Stuff
        </Link>
        <Trending />
      </div>
    </div>
  </div>
);

export default BooksPage;
