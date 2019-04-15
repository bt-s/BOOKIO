import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import RatingStars from '../Books/RatingStars';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const BookItem = props => {
  //console.log(props);
  return (
    <Link to={'/detail/' + props.bookId}>
      <div className="book-item-header">
        <h3 className="book-item-title">{props.bookTitle}</h3>
        <h3 className="book-item-author">{props.authorName}</h3>
      </div>
      <img
        className="book-item-img"
        src={props.bookImgSrc}
        alt={props.bookTitle}
      />
      <div className="book-item-inner">
        <div className="book-item-inner-header">
          <RatingStars rating={props.rating} />
          <div className="book-item-type">{props.type}</div>
        </div>
        <p className="book-item-description">
          {props.bookDescription.substring(0, 120) + '...'}
        </p>
        <div className="book-item-inner-footer">
          <div className="book-item-user-info">
            <img
              className="book-item-user-avatar"
              src={props.userAvatar}
              alt=""
            />
            <div className="book-item-username">{props.userName}</div>
          </div>
          <div className="book-item-distance-container">
            <FontAwesomeIcon icon="map-marker-alt" aria-hidden="true" />
            <span className="book-item-distance">
              {props.locationDistance} away
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

BookItem.propTypes = {
  authorName: PropTypes.string,
  bookTitle: PropTypes.string,
  bookDescription: PropTypes.string,
  bookImgSrc: PropTypes.string,
  locationDistance: PropTypes.string,
  type: PropTypes.string,
  userAvatar: PropTypes.string,
  userName: PropTypes.string
};

BookItem.defaultProps = {
  locationDistance: '1.4 km'
};

export {BookItem};
