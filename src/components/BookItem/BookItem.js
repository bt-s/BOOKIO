import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Numeral from 'numeral';

import RatingStars from '../Books/RatingStars';
import UserLabel from '../Books/UserLabel';

const BookItem = props => {
  const parseDistance = distance => {
    const dist =
      parseInt(distance) > 0
        ? Numeral(distance).format('0.0') + 'km'
        : parseInt(distance * 1000) + 'm';
    return dist;
  };

  const booksPageOnly = (
    <div className="book-item-inner-footer">
      <UserLabel userName={props.userName} avatarUrl={props.userAvatar} />
      <div className="book-item-distance-container">
        <FontAwesomeIcon icon="map-marker-alt" aria-hidden="true" />
        <span className="book-item-distance">
          {parseDistance(props.distance)}
        </span>
      </div>
    </div>
  );

  return (
    <Link to={'/detail/' + props.bookId}>
      <img
        className="book-item-img"
        src={props.bookImgSrc}
        alt={props.bookTitle}
      />
      <div className="book-item-header">
        <h3 className="book-item-title">{props.bookTitle}</h3>
        <h3 className="book-item-author">{props.authorName}</h3>
      </div>
      <div className="book-item-inner">
        <div className="book-item-inner-header">
          <RatingStars rating={props.rating} />
          <div className="book-item-type">{props.type}</div>
        </div>
        <p className="book-item-description">
          {props.bookDescription.substring(0, 120) + '...'}
        </p>
        {!props.accountPage && booksPageOnly}
      </div>
    </Link>
  );
};

BookItem.propTypes = {
  authorName: PropTypes.string,
  bookTitle: PropTypes.string,
  bookDescription: PropTypes.string,
  bookImgSrc: PropTypes.string,
  distance: PropTypes.number,
  type: PropTypes.string,
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  rating: PropTypes.number
};

export default BookItem;
