import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GoogleMap from '../components/GoogleMap/GoogleMap';
import {withFirebase} from '../components/Firebase';
import UserLabel from '../components/Books/UserLabel';
import RatingStars from '../components/Books/RatingStars';
import Button from '../components/Button/Button';

import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const _ = require('lodash/core');

const BookDetailContainer = props => {
  const [book, setBooks] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    fetchBookInfo(props.match.params.bookId);
  }, []);

  const fetchOwnerInfo = ownerId => {
    props.firebase
      .user(ownerId)
      .get()
      .then(owner => {
        if (owner.exists) {
          setOwner(owner.data());
        } else {
          console.error('Owner undefined');
        }
      })
      .catch(function(error) {
        console.error('Error getting document:', error);
      });
  };

  const fetchBookInfo = bookId => {
    props.firebase
      .book(bookId)
      .get()
      .then(book => {
        if (book.exists) {
          setBooks(book.data());
          fetchOwnerInfo(book.data().ownerId);
        } else {
          console.error('No such document!');
        }
      })
      .catch(function(error) {
        console.error('Error getting document:', error);
      });
  };

  return (
    <BookDetail
      book={book}
      owner={owner}
      firebase={props.firebase}
      bookId={props.match.params.bookId}
    />
  );
};

BookDetailContainer.propTypes = {
  authUser: PropTypes.object,
  books: PropTypes.array,
  dispatch: PropTypes.func,
  firebase: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

const BookDetail = props => {
  const [requestBtnTxt, setRequestBtnTxt] = useState('Request');
  const {book, owner, firebase, bookId} = props;

  const requestBook = () => {
    const consumerID = firebase.getMyUID();
    firebase
      .user(consumerID)
      .get()
      .then(user => {
        const item =
          user.data().items &&
          user.data().items.filter(item => item === bookId);

        if (!_.isEmpty(item)) {
          setRequestBtnTxt('Requested');
        } else {
          firebase
            .transactions()
            .add({
              providerID: book.ownerId,
              consumerID: consumerID,
              status: 'Ongoing',
              requestTime: new Date().getTime(),
              itemID: bookId,
              type: book.type // lend or give
            })
            .then(transac => {
              setRequestBtnTxt('Requested');
              firebase.user(consumerID).update({
                transactions: (user.data().transactions || []).concat(
                  transac.id
                ),
                // items I requested
                items: (user.data().items || []).concat(bookId)
              });
              firebase.user(book.ownerId).update({
                transactions: (user.data().transactions || []).concat(
                  transac.id
                )
              });
            })
            .catch(err => {
              console.error('Request failed', err);
            });
        }
      });
  };

  const borrowOrHave =
    book.type === 'lend' ? (
      <span>You can borrow this book from:</span>
    ) : (
      <span>You can get this book for free from:</span>
    );

  const ownerDetails = (
    <div className="owner-field">
      {firebase.getMyUID() !== book.ownerId ? (
        <div>
          {borrowOrHave}
          <UserLabel avatarUrl={owner.photoUrl} userName={owner.username} />
        </div>
      ) : (
        <div>Provided by you!</div>
      )}
    </div>
  );

  const googleMap = (
    <div className="google-map-wrapper">
      {book.location && (
        <GoogleMap
          style={{
            width: '250px',
            height: '350px'
          }}
          coord={book.location}
          initCoord={book.location}
          zoom={15}
        />
      )}
    </div>
  );

  const getImages = () => {
    if (book.imageUrls) {
      const mod = Math.min(book.imageUrls.length, 2);

      return book.imageUrls.map((image, ix) => (
        <img
          key={ix}
          className="book-img"
          src={image}
          alt={book.title}
          style={{width: `calc(100% / ${mod} - 20px)`}}
        />
      ));
    }
  };

  return (
    <div className="book-details-container">
      <div className="book-details-page-header">
        <div className="book-title">{book.title}</div>
        <Link to={ROUTES.BOOKS} className="btn btn-orange">
          To Books Overview
        </Link>
      </div>
      <div className="book-info-container">
        <div className="author">by {book.author}</div>
        <div className="images">{getImages()}</div>
        <div className="book-rating">
          <span>Rating from GoodReads: </span>
          <RatingStars rating={book.rating} />
        </div>
        <div className="header-description">Description </div>
        <div className="book-description">{book.description}</div>
      </div>
      <div className="book-pickup-container">
        <div className="header-pickup">Pickup Location </div>
        {googleMap}
        {ownerDetails}
        {firebase.getMyUID() && firebase.getMyUID() !== book.ownerId && (
          <Button
            className={
              'btn btn-black' +
              (requestBtnTxt === 'Requested' ? ' btn-disabled' : '')
            }
            onClick={requestBook}
            text={requestBtnTxt}
          />
        )}
      </div>
    </div>
  );
};

BookDetail.propTypes = {
  book: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  owner: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  firebase: PropTypes.object,
  bookId: PropTypes.string
};

const mapStateToProps = state => ({
  books: state.booksState.books,
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(withFirebase(BookDetailContainer));
