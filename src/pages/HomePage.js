import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {withFirebase} from '../components/Firebase';
import {
  faPhone,
  faEnvelope,
  faHome,
  faBirthdayCake,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const HomePage = props => {
  const bannerSrcSet = [
    ''.concat(
      require('../images/homepage/book-stack-min-500x600.jpg'),
      ' 480w'
    ),
    ''.concat(
      require('../images/homepage/book-stack-min-1400x467.jpg'),
      ' 768w'
    ),
    ''.concat(
      require('../images/homepage/book-stack-min-2400x600.jpg'),
      ' 1400w'
    ),
  ].join(',');

  return (
    <React.Fragment>
      <img
        className="home-img-banner"
        src={require('../images/bookstack.jpg')}
        alt="Book stack homepage banner"
      />

      <div className="home-banner-txt-container">
        <div className="inner">
          <h1>Join the largest book sharing platform in the world</h1>
          <div>
            BOOKIO connects the people who want to give their books away or lend
            their books.
          </div>
          <br />
          If you want to read a book without paying it or want to give or lend
          the book, BOOKIO is for you
          <br />
          <br />
          <br />
          <Link to={ROUTES.SIGN_UP} className="btn btn-orange btn-signup">
            Join Now
          </Link>
        </div>
      </div>

      <div className="field-item center">
        <div>
          <div className="inner-card">
            <h2>Secure</h2>
            All your transacton is protected with compliance procedure
          </div>
        </div>

        <div>
          <div className="inner-card">
            <h2>Easy</h2>
            Find your favorite book, request and get the book within 5 minutes
          </div>
        </div>

        <div>
          <div className="inner-card">
            <h2>Efficient</h2>
            Easy to track your booking history and get reminder for every action
          </div>
        </div>
        <div>
          <div className="inner-card">
            <h2>Search</h2>
            Lot of books from different authors with different languages
          </div>
        </div>
      </div>

      <h1>How BOOKIO works?</h1>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  firebase: PropTypes.object,
};

export default compose(withFirebase)(HomePage);
