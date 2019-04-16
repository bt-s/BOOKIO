import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GoogleMap from '../components/GoogleMap/GoogleMap';
import {withFirebase} from '../components/Firebase';
import UserLabel from '../components/Books/UserLabel';
import RatingStars from '../components/Books/RatingStars';

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

const BookDetail = props => {
  const {book, owner, firebase, bookId} = props;
  const requestBook = () => {
    const consumerID = firebase.getMyUID();
    console.log('book.type', book.type);

    firebase
      .user(consumerID)
      .get()
      .then(user => {
        const item =
          user.data().items &&
          user.data().items.filter(item => item === bookId);

        !_.isEmpty(item)
          ? alert('You have already requested this item')
          : firebase
              .transactions()
              .add({
                providerID: book.ownerId,
                consumerID: consumerID,
                status: 'Ongoing',
                requestTime: new Date().getTime(),
                itemID: bookId,
                type: book.type
              })
              .then(transac => {
                console.log('Request successful, transaction id is:', transac);
                console.log('user me', user, user.data());
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
                alert('You have successfully requested this item');
              })
              .catch(err => {
                console.log('Request failed', err);
              });
      });
  };

  const borrowOrHave =
    book.type === 'to borrow' ? (
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

  return (
    <div className="book-details-container">
      <div className="book-info-container">
        <div className="book-title">{book.title}</div>
        <div className="author">by {book.author}</div>
        <img className="book-img" src={book.imageUrls} alt={book.title} />
        <div className="book-rating">
          <span>GoodReads users give this book: </span>
          <RatingStars rating={book.rating} />
        </div>
        <div className="header-description">Description </div>
        <div className="book-description">{book.description}</div>
      </div>
      <div className="book-pickup-container">
        <div className="header-pickup">Pickup Location </div>
        {googleMap}
        <div className="distance">
          {book.location && book.location.lat + ' ' + book.location.lon}
        </div>
        {ownerDetails}
      </div>
      {firebase.getMyUID() !== book.ownerId && (
        <button className="btn-request btn" onClick={requestBook}>
          Request
        </button>
      )}
    </div>
  );
};

BookDetail.propTypes = {
  imageUrls: PropTypes.string,
  title: PropTypes.string,
  distance: PropTypes.string,
  description: PropTypes.string,
  userProfile: PropTypes.string,
  rating: PropTypes.string,
  reviewTotal: PropTypes.string,
  author: PropTypes.string,
  timeToPick: PropTypes.string,
  pickupLocation: PropTypes.string
};

const mapStateToProps = state => ({
  books: state.booksState.books,
  authUser: state.sessionState.authUser
});
export default connect(mapStateToProps)(withFirebase(BookDetailContainer));
