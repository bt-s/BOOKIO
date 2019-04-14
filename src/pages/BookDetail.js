import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import {withFirebase} from '../components/Firebase';
import UserLabel from '../components/Books/UserLabel';
import RatingStars from '../components/Books/RatingStars';

const BookDetailContainer = props => {
  const [book, setBooks] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    fetchBookInfo(props.match.params.bookId);
  }, []);

  const fetchOwnerInfo = ownerId => {
    var ownerInfo = props.firebase.user(ownerId);
    ownerInfo
      .get()
      .then(owner => {
        if (owner.exists) {
          setOwner(owner.data());
        } else {
          console.error('owner undefined');
        }
      })
      .catch(function(error) {
        console.error('Error getting document:', error);
      });
  };

  const fetchBookInfo = bookId => {
    const bookDetail = props.firebase.book(bookId);
    bookDetail
      .get()
      .then(book => {
        if (book.exists) {
          setBooks(book.data());
          fetchOwnerInfo(book.data().owner);
        } else {
          console.error('No such document!');
        }
      })
      .catch(function(error) {
        console.error('Error getting document:', error);
      });
  };

  const loc = book.location;
  if (loc !== undefined) {
    const latitude = loc.lat;
    const longitude = loc.lon;
  }

  return (
    <BookDetail
      book={book}
      owner={owner}
      firebase={props.firebase}
      bookId={props.match.params.bookId}
    />
  );
};

const BookDetail = ({book, owner, firebase, bookId}) => {
  const requestBook = () => {
    firebase
      .transactions()
      .add({
        providerID: book.owner,
        consumerID: firebase.getMyUID(),
        status: 'Ongoing',
        requestTime: new Date().getTime(),
        itemID: bookId,
        type: book.type
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
      <div className="book-info-container">
        <div className="book-title">{book.title}</div>
        <div className="author">by {book.author}</div>
        <img className="book-img" src={book.imageUrls} alt={book.title} />
        <RatingStars rating={toString(book.rating)} />
        <div className="header-description">Description </div>
        <div className="service-description">{book.description}</div>
      </div>
      <div className="book-pickup-container">
        <div className="header-pickup">Pickup Location </div>
        <div className="google-map-wrapper">
          <GoogleMap />
        </div>
        {/* We should calculate the distance here. -----book.location----- */}
        <div className="distance">
          {book.location && book.location.lat + ' ' + book.location.lon}
        </div>
        <div className="owner-field">
          <span>Provided by:</span>
          <UserLabel avatarURL={owner.avatar} userName={owner.owner} />
        </div>
      </div>
      <button className="btn-request btn" onClick={requestBook}>
        Request
      </button>
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

export default withFirebase(BookDetailContainer);
