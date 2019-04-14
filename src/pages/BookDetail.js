import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import {withFirebase} from '../components/Firebase';
import UserLabel from '../components/Books/UserLabel';
import RatingStars from '../components/Books/RatingStars';

const BookDetailContainer = props => {
  const [book, setBooks] = useState([]);

  useEffect(() => {
    fetchBookInfo(props.match.params.bookId);
  }, []);

  const fetchBookInfo = bookId => {
    const bookDetail = props.firebase.book(bookId);
    bookDetail
      .get()
      .then(book => {
        if (book.exists) {
          setBooks(book.data());
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
      firebase={props.firebase}
      bookId={props.match.params.bookId}
    />
  );
};

const BookDetail = ({book, firebase, bookId}) => {
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
        console.log('request success');
      })
      .catch(() => {
        console.log('request fail');
      });
  };

  const borrowOrHave = (book.type = 'to borrow' ? (
    <span>You can borrow this book from:</span>
  ) : (
    <span>You can get this book for free from:</span>
  ));

  const googleMap = (
    <div className="google-map-wrapper">
      {book.location && (
        <GoogleMap
          width="250px"
          height="350px"
          coord={{
            lat: book.location.lat,
            lng: book.location.lon
          }}
          initCoord={{
            lat: book.location.lat,
            lng: book.location.lon
          }}
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
          <RatingStars rating={'' + book.rating} />
        </div>
        <div className="header-description">Description </div>
        <div className="book-description">{book.description}</div>
      </div>
      <div className="book-pickup-container">
        <div className="header-pickup">Pickup Location </div>
        {googleMap}
        <div className="owner-field">
          {borrowOrHave}
          <UserLabel avatarURL={book.avatar} userName={book.owner} />
        </div>
      </div>
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
