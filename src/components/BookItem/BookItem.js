import React from 'react';
import PropTypes from 'prop-types';

import reactJPG from '../../images/fullstackreact.jpg';
import reactSVG from '../../images/react.svg';

const BookItem = props => (
  <div className="book-item-container">
    <img
      className="book-item-cover-image"
      src={props.imageSource}
      alt={props.bookTitle}
    />
    <h2>{props.bookTitle}</h2>
    <h3>{props.authorName}</h3>
    <div className="book-item-details">
      <img
        className="book-item-user-avatar"
        src={props.userAvatar}
        alt={props.userName}
      />
      <span className="book-item-user-name">{props.userName}</span>
      <span className="book-item-location-name">{props.locationName},</span>
      <span className="book-item-location-distance">
        {props.locationDistance}
      </span>
    </div>
  </div>
);

BookItem.propTypes = {
  imageSource: PropTypes.string,
  bookTitle: PropTypes.string,
  authorName: PropTypes.string,
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  locationName: PropTypes.string,
  locationDistance: PropTypes.string
};

BookItem.defaultProps = {
  imageSource: reactJPG,
  bookTitle: 'Fullstack React',
  authorName: 'Accomazzo Anthony, Ari Lerner, and Murray Nathaniel',
  userAvatar: reactSVG,
  userName: 'React Wizard',
  locationName: 'Brinellvägen 8',
  locationDistance: '200m'
};

export default BookItem;
