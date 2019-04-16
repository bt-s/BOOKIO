import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {withFirebase} from '../components/Firebase';

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
    )
  ].join(',');

  return (
    <React.Fragment>
      <img
        className="home-img-banner"
        srcSet={bannerSrcSet}
        src={require('../images/homepage/book-stack-min-1400x467.jpg')}
        alt="Book stack homepage banner"
      />
      <div className="home-banner-txt-container">
        <div className="inner">
          <h1>
            <span className="left">BOOK</span>
            <span className="right">IO</span>
          </h1>
          <h2>Free book-sharing made easy</h2>
          <p>
            Register an account today, so that you can share and request books!
          </p>
          <div className="homepage-btns">
            <Link to={ROUTES.SIGN_UP} className="btn btn-orange btn-homepage">
              Register Now
            </Link>
            <Link to={ROUTES.BOOKS} className="btn btn-black btn-homepage">
              Find Books
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  firebase: PropTypes.object
};

export default compose(withFirebase)(HomePage);
