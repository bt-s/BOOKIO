import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import {withFirebase} from '../components/Firebase';
import imageDummy from '../images/kafka.jpg';
import userProfile from '../images/kafka.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {UserLabel, RatingStars} from '../components/Books/Components';

const BookDetailComponent = props => {
  const [loading, setLoading] = useState(false);
  const [book, setBooks] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    fetchBookInfo(props.match.params.bookId);
  }, []);

  const fetchBookInfo = bookId => {
    setLoading(true);
    const bookDetail = props.firebase.book(bookId);
    bookDetail
      .get()
      .then(book => {
        if (book.exists) {
          setLoading(false);
          setBooks(book.data());
          fetchOwnerInfo(book.data().owner);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        setLoading(false);
        console.log('Error getting document:', error);
      });
  };

  const fetchOwnerInfo = ownerId => {
    setLoading(true);
    var ownerInfo = props.firebase.user(ownerId);
    ownerInfo
      .get()
      .then(owner => {
        if (owner.exists) {
          setOwner(owner.data());
          setLoading(false);
        } else {
          console.log('owner undefined');
        }
      })
      .catch(function(error) {
        setLoading(false);
        console.log('Error getting document:', error);
      });
  };

  var loc = book.location;
  var latitude;
  var longitude;
  if (loc !== undefined) {
    console.log('latitude:' + loc.lat);
    latitude = loc.lat;

    console.log('longitude:' + loc.lon);
    longitude = loc.lon;
  }

  return (
    <div>
      <BookDetail
        book={book}
        owner={owner}
        firebase={props.firebase}
        bookId={props.match.params.bookId}
      />
    </div>
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
        <RatingStars rating={book.rating} />
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

BookDetail.defaultProps = {
  imageUrls: imageDummy,
  title: 'Kafka on the Shore',
  distance: '1.2 km away',
  owner: 'Spongebob',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
  aboutBook:
    'This book is about how to know urself this book is about how to know urself this book is about how to know urself ',
  userProfile: userProfile,
  rating: '4.5',
  reviewTotal: '123',
  author: 'Haruki Murakkami',
  timeToPick: '12 March 2019, 18.00',
  pickupLocation: 'KTH Entree '
};

export default withFirebase(BookDetailComponent);
