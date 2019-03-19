import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import GoogleMap from '../GoogleMap/GoogleMap';
import imageDummy from '../../images/kafka.jpg';
import location from '../../assets/location.png';
import Rating from '../Rating/Rating';
import userProfile from '../../images/kafka.jpg';

const BookDetail = props => (
  <div className="book-details-container">
    <div className="left-container">
      <div className="book-title">{props.bookTitle}</div>
      <img className="book-img" src={props.imageSource} alt={props.bookTitle} />
      <div className="rating">Rating: {props.rating} </div> 
      <div className="header-description">Description </div>
      <div className="service-description">{props.serviceDescription}</div>
    </div>
    <div className="right-container">
      <div className="header-pickup">Pickup Location </div>
      <div className="google-map-wrapper">
        <GoogleMap />
      </div>
      <img className="icon-distance" src={location} name={props.distance} />
      <div className="distance"> {props.distance} </div>
      <div className="user-profile">
        <img className="user-profile" src={props.userProfile} />
        <div className="user-name">{props.userName}</div>
         <button className="btn-request"> Request </button>
      </div>
    </div>
  </div>
);

function getStars(rating) {

  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  // If there is a half a star, append it
  if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  // Fill the empty stars
  for (let i = (5 - rating); i >= 1; i--)
    output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  return output.join('');

}
BookDetail.propTypes = {
  imageSource: PropTypes.string,
  bookTitle: PropTypes.string,
  distance: PropTypes.string,
  lender: PropTypes.string,
  bookDescription: PropTypes.string,
  serviceDescription: PropTypes.string,
  userProfile: PropTypes.string,
  rating: PropTypes.string,
};

BookDetail.defaultProps = {
  imageSource: imageDummy,
  bookTitle: 'Kafka on the Shore',
  distance: '1.2 km away',
  userName: 'Spongebob',
  serviceDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
  userProfile: userProfile,
  rating: '5',
};

export default BookDetail;
