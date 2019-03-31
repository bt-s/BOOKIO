import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import imageDummy from '../images/kafka.jpg';
import userProfile from '../images/kafka.jpg';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {
  faStar,
  faStarHalf,
  faLocationArrow,
  faMapPin,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const getStars = rating => {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (let i = rating; i > 0; i--)
    // If there is a half a star, append it
    if (i === 0.5) {
      output.push(<FontAwesomeIcon icon={faStarHalf} />);
    } else {
      output.push(<FontAwesomeIcon icon={faStar} />);
    }
  return output;
};

const BookDetail = props => (
  <div className="book-details-container">
    <div className="book-info-container">
      <div className="title">
        <div className="book-title">{props.bookTitle}</div>
        <button className="book-type"> Give Away</button>
      </div>
      <div className="author">by {props.authors}</div>

      <div id="goodreads-info">
        <div className="rating">
          {getStars(props.rating)} {props.rating}
        </div>
        <div className="total-review">{props.reviewTotal} Reviews</div>
      </div>

      <div className="book-info">
        <img
          className="book-img"
          src={props.imageSource}
          alt={props.bookTitle}
        />
        <div className="about">
          <div className="about-book-header">About Book</div>
          <br />
          <div className="about-book">{props.aboutBook}</div>
        </div>
      </div>
      <div className="header-description">Description </div>
      <div className="service-description">{props.serviceDescription}</div>
    </div>
    <div className="book-pickup-container">
      <div className="header-pickup">Pickup Information </div>
      <span className="time-to-pick">
        <FontAwesomeIcon icon={faClock} />
        {'  ' + props.timeToPick}
      </span>
      <br />
      <span className="location-to-pick">
        <FontAwesomeIcon icon={faMapPin} />
        {'  ' + props.pickupLocation}
      </span>

      <div className="google-map-wrapper">
        <GoogleMap />
      </div>

      <div className="distance">
        <FontAwesomeIcon icon={faLocationArrow} />
        {'  ' + props.distance}
      </div>
      <br />
      <br />
      <div className="user-info">
        <img className="user-profile" src={props.userProfile} alt="" />
        <div className="user-name">{props.userName}</div>
      </div>
      
     
      <Link className="btn-request" to={ROUTES.MY_BOOK_HISTORY}>
          Request
      </Link>
    </div>
  </div>
);

BookDetail.propTypes = {
  imageSource: PropTypes.string,
  bookTitle: PropTypes.string,
  distance: PropTypes.string,
  lender: PropTypes.string,
  bookDescription: PropTypes.string,
  serviceDescription: PropTypes.string,
  userProfile: PropTypes.string,
  rating: PropTypes.string,
  reviewTotal: PropTypes.string,
  authors: PropTypes.string,
  timeToPick: PropTypes.string,
  pickupLocation: PropTypes.string,
};

BookDetail.defaultProps = {
  imageSource: imageDummy,
  bookTitle: 'Kafka on the Shore',
  distance: '1.2 km away',
  userName: 'Spongebob',
  serviceDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
  aboutBook:
    'This book is about how to know urself this book is about how to know urself this book is about how to know urself ',
  userProfile: userProfile,
  rating: 4.5,
  reviewTotal: 123,
  authors: 'Haruki Murakkami',
  timeToPick: '12 March 2019, 18.00',
  pickupLocation: 'KTH Entree ',
};

export default BookDetail;
