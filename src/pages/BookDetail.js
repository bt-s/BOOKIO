import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import {withFirebase} from '../components/Firebase';
import imageDummy from '../images/kafka.jpg';
import userProfile from '../images/kafka.jpg';

import {faStar, faStarHalf} from '@fortawesome/free-solid-svg-icons';
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

const BookDetail = props => {
  const requestBook = () => {
    console.log('request book entered');

    props.firebase
      .transactions()
      .add({
        providerID: 'fake provider', // id should be added
        consumerID: props.firebase.getMyUID(),
        status: 'ongoing',
        requestTime: new Date().getTime(),
        itemID: 'fake item id', // item id should be added
        type: 'lend'
      })
      .then(() => {
        console.log('reqeust success');
      })
      .catch(() => {
        console.log('request fail');
      });
  };
  return (
    <div className="book-details-container">
      <button className="btn-request btn" onClick={requestBook}>
        Request
      </button>
      <div className="book-info-container">
        <div className="book-title">{props.bookTitle}</div>
        <img
          className="book-img"
          src={props.imageSource}
          alt={props.bookTitle}
        />
        <div className="rating">{getStars(props.rating)} </div>
        <div className="header-description">Description </div>
        <div className="service-description">{props.serviceDescription}</div>
      </div>
      <div className="book-pickup-container">
        <div className="header-pickup">Pickup Location </div>
        <div className="google-map-wrapper">
          <GoogleMap />
        </div>
        <div className="distance">{props.distance} </div>
        <div className="user-info">
          <img className="user-profile" src={props.userProfile} alt="" />
          <div className="user-name">{props.userName}</div>
        </div>
        <button className="btn-request btn" onClick={requestBook}>
          Request
        </button>
      </div>
    </div>
  );
};

BookDetail.propTypes = {
  imageSource: PropTypes.string,
  bookTitle: PropTypes.string,
  distance: PropTypes.string,
  lender: PropTypes.string,
  bookDescription: PropTypes.string,
  serviceDescription: PropTypes.string,
  userProfile: PropTypes.string,
  rating: PropTypes.string
};

BookDetail.defaultProps = {
  imageSource: imageDummy,
  bookTitle: 'Kafka on the Shore',
  distance: '1.2 km away',
  userName: 'Spongebob',
  serviceDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
  userProfile: userProfile,
  rating: 4.5
};

export default withFirebase(BookDetail);
