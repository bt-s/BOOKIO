import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {getGeoDistance} from '../helpers/utils';
import {storeBooks} from '../redux/actions/storeBooks';
import * as ROUTES from '../constants/routes';

import Loader from '../components/Loader/Loader';
import SearchResults from '../components/Books/SearchResults';
import FilterGroup from '../components/Books/FilterGroup';
import {index} from '../components/Algolia';

const BooksPage = props => {
  const [borrowFilterOn, setBorrowFilterOn] = useState(false);
  const [haveFilterOn, setHaveFilterOn] = useState(false);
  const [coordinate, setCoordinate] = useState({lat: 23, lng: 23});

  const onFilter = filter => {
    index
      .search({
        filters: filter
      })
      .then(res => {
        props.storeBooks(withDistance(res.hits));
      })
      .catch(err => {
        console.error(err);
      });
  };

  const withDistance = books => {
    return books.map(book => {
      return {
        ...book,
        distance: getGeoDistance(
          book.location.lat,
          book.location.lon,
          coordinate.lat,
          coordinate.lng
        )
      };
    });
  };

  const getBooks = () => {
    axios({
      method: 'GET',
      url: `https://us-central1-bookio.cloudfunctions.net/getBooks`
    })
      .then(res => {
        props.storeBooks(withDistance(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      console.log('im at', pos.coords);
      setCoordinate({lat: pos.coords.latitude, lng: pos.coords.longitude});
      getBooks();
    });
  }, []);

  return (
    <div>
      <div className="books-tool-bar">
        <FilterGroup
          onFilterUpdate={filters => {
            const strMap = {
              'Books to Borrow': 'to borrow',
              'Books to Have': 'to have'
            };
            console.log('filters', filters);
            console.log(
              '00000000000',
              filters.reduce(
                (pre, cur) => pre + ' OR type:"' + strMap[cur] + '"',
                'type:"_____"'
              )
            );
            if (filters.length > 0) {
              onFilter(
                filters.reduce(
                  (pre, cur) => pre + ' OR type:"' + strMap[cur] + '"',
                  'type:"_____"'
                )
              );
            } else {
              onFilter(
                `type:"${strMap['Books to Have']}" OR type:"${
                  strMap['Books to Borrow']
                }"`
              );
            }
          }}
          filters={['Books to Borrow', 'Books to Have']}
        />
        <Link className="btn btn-add-book" to={ROUTES.ADD_BOOK}>
          Add Book
        </Link>
      </div>
      {props.books ? <SearchResults books={props.books} /> : <Loader />}
    </div>
  );
};

BooksPage.propTypes = {
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
)(BooksPage);
