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
        src={require('../images/reading.png')}
        alt="Book stack homepage banner"
      />

      <div className="home-banner-txt-container">
        <div className="inner">
          <h1>Join the largest book sharing platform in the world</h1>
          <div className="inner-content">
            BOOKIO is a leading book sharing platform in the world. It connects
            the people who want to give or lend their books away and the people
            who want to read the book without paying it. If you want to
            contribute for a sustainable environment and improve the world
            literacy, BOOKIO is for you.
          </div>
          <br />

          <br />
          <Link to={ROUTES.SIGN_UP} className="btn btn-dark-orange btn-signup">
            Join Now
          </Link>
          <br />
        </div>
      </div>

      <div className="field-item center search-result">
        <div>
          <div className="inner-card">
            <h2>Secure</h2>
            <div className="line-break" />
            <br />
            We ensure that every transaction is secure with compliance
            procedure.
          </div>
        </div>

        <div>
          <div className="inner-card">
            <h2>Easy</h2>
            <div className="line-break" />
            <br />
            <div>
              Find your favorite book, request to owner, and let you decide when
              you want to pick it up.
            </div>
          </div>
        </div>

        <div>
          <div className="inner-card">
            <h2>Efficient</h2>
            <div className="line-break" />
            <br />
            Track your booking without hassle. You will be notified for every
            process.
          </div>
        </div>
        <div>
          <div className="inner-card">
            <h2>Search</h2>
            <div className="line-break" />
            <br />
            We provide lot of books from different authors with different
            languages
          </div>
        </div>
      </div>

      <div className="title-section">How BOOKIO works? </div>
      <div className="user-information">
        <img
          className="mockup-platform"
          src={require('../images/image_1.png')}
          alt="Book stack homepage banner"
        />

        <div className="how-it-works">
          <div>
            <div className="header-title">Find your book</div>
            Search the book that you want to read. BOOKIO provides a fully
            comprehensive books from various authors provided in different
            languages.
          </div>
          <div>
            <div className="header-title">Request the book</div>
            Request to lend or get the book from the book's owner. We let the
            owner decide to lend or give their books away.
          </div>
          <div>
            <div className="header-title">Meet the owner</div>
            Set the appointment to meet the owner to pickup the book. Our
            platform will only give the owner detail location once the request
            is approved.
          </div>
          <div>
            <div className="header-title">Return the book</div>
            Return the book on time to let other customer read the book you
            like. We will remind you when you need to return the book.
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  firebase: PropTypes.object,
};

export default compose(withFirebase)(HomePage);
