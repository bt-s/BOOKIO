import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Numeral from 'numeral';

import RatingStars from '../Books/RatingStars';
import UserLabel from '../Books/UserLabel';

import {index} from '../Algolia';

const BookItem = props => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const initCoords = {
    lat: 0,
    lng: 0
  };

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
        {JSON.stringify(props.coords) !== JSON.stringify(initCoords) && (
          <React.Fragment>
            <FontAwesomeIcon icon="map-marker-alt" aria-hidden="true" />
            <span className="book-item-distance">
              {parseDistance(props.distance)}
            </span>
          </React.Fragment>
        )}
      </div>
    </div>
  );

  const deleteBookItem = e => {
    e.preventDefault();

    props.firebase
      .book(props.bookId)
      .delete()
      .then(() => {
        setDeleted(true);
        index.deleteObject(props.bookId);
      });
  };

  const confirmDeleteFunc = e => {
    e.preventDefault();
    if (!confirmDelete) {
      setTimeout(() => setConfirmDelete(false), 5000); // disappear in 5s
      setConfirmDelete(true);
    } else {
      setConfirmDelete(false);
    }
  };

  const accountPageOnly = (
    <div className="delete-book">
      {confirmDelete && (
        <button className="delete-confirm-btn" onClick={deleteBookItem}>
          Confirm Deletion
        </button>
      )}
      <button className="delete-book-btn" onClick={confirmDeleteFunc}>
        <FontAwesomeIcon icon="times" />
      </button>
    </div>
  );

  return (
    <Link
      to={'/detail/' + props.bookId}
      className={'book-item-container' + (deleted ? ' hide' : '')}>
      {props.accountPage && accountPageOnly}
      <div
        className={
          confirmDelete
            ? 'book-item-img-container dim-this'
            : 'book-item-img-container'
        }>
        <img
          className="book-item-img"
          src={props.bookImgSrc}
          alt={props.bookTitle}
        />
      </div>
      <div className="book-item-header">
        <h3 className="book-item-title">{props.bookTitle}</h3>
        <h3 className="book-item-author">{props.authorName}</h3>
      </div>
      <div className="book-item-inner">
        <div className="book-item-inner-header">
          <RatingStars rating={props.rating} />
          <div
            className={
              'book-item-type' +
              (props.type === 'give' ? ' give-label' : ' lend-label')
            }>
            {{lend: 'To Borrow', give: 'To Have'}[props.type]}
          </div>
        </div>
        <p className="book-item-description">
          {props.bookDescription.substring(0, 100) + '...'}
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

const mapStateToProps = state => ({
  coords: state.coordsState.coords
});

export default connect(mapStateToProps)(withFirebase(BookItem));
