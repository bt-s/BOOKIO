import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Numeral from 'numeral';

import RatingStars from '../Books/RatingStars';

const BookItem = props => {
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
          <RatingStars rating="3.5" />
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
              {parseInt(props.distance) > 0
                ? Numeral(props.distance).format('0.0') + 'km'
                : parseInt(props.distance * 1000) + 'm'}{' '}
              away
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
  distance: PropTypes.number,
  type: PropTypes.string,
  userAvatar: PropTypes.string,
  userName: PropTypes.string
};

BookItem.defaultProps = {
  distance: '1.4 km'
};

export {BookItem};
