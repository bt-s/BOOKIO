import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {withFirebase} from '../components/Firebase';

const createCard = (title, text) => (
  <div className="inner-card">
    <h2>{title}</h2>
    <div className="line-break" />
    <span>{text}</span>
  </div>
);

const createHowItWorks = (title, text) => (
  <div>
    <h3 className="header-title">{title}</h3>
    <p>{text}</p>
  </div>
);

const HomePage = props => (
  <div className="home-page">
    <div className="home-page-banner">
      <div className="home-banner-txt-container">
        <div className="inner">
          <h1>Join the largest book sharing platform in the world</h1>

          <div className="inner-content">
            BOOKIO is one of the world's leading book sharing platforms. It
            connects the people who want to give or lend their books away to the
            people who want to read a book without buying it. If you want to
            contribute for a sustainable environment and improve the world's
            literacy, BOOKIO is for you.
          </div>

          <div className="banner-buttons">
            <Link to={ROUTES.SIGN_UP} className="btn btn-black btn-homepage">
              <span>Join Now</span>
            </Link>
            <Link to={ROUTES.BOOKS} className="btn btn-orange btn-homepage">
              <span>Find Books</span>
            </Link>
          </div>
        </div>
      </div>
      <img
        className="home-img-banner"
        src={require('../images/reading.png')}
        alt="Book stack homepage banner"
      />
    </div>

    <div className="homepage-cards">
      {createCard(
        'Secure',
        'We ensure that every transaction is secure with a compliance procedure.'
      )}
      {createCard(
        'Easy',

        'Find your favorite book, request to owner, and decide on when you can \
        come pick it up.'
      )}
      {createCard(
        'Efficient',
        'Track your booking without hassle. You will be notified for every \
        process change.'
      )}
      {createCard(
        'Search',
        'We provide lots of books from different authors with different \
        languages'
      )}
    </div>

    <div className="title-section">How does BOOKIO work? </div>
    <div className="how-it-works-container">
      <img
        className="mockup-platform"
        src={require('../images/image_1.png')}
        alt="Book stack homepage banner"
      />

      <div className="how-it-works">
        {createHowItWorks(
          'Find your book',
          'Search the book that you want to read. BOOKIO provides a \
          comprehensive library with books from various authors provided in \
          different languages.'
        )}
        {createHowItWorks(
          'Find your book',
          'Search the book that you want to read. BOOKIO provides a \
            comprehensive user library comprehensive books from various authors \
            provided in different languages.'
        )}
        {createHowItWorks(
          'Request the book',
          "Request to borrow or get the book from the book's owner. We let book \
            owners decide whether to lend or give their books away."
        )}
        {createHowItWorks(
          'Meet the owner',
          'Set the appointment to meet the owner to pickup the book. Our \
            platform will only give the owner detail location once the request \
            is approved.'
        )}
      </div>
    </div>
  </div>
);

HomePage.propTypes = {
  firebase: PropTypes.object
};

export default compose(withFirebase)(HomePage);
