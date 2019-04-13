import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import {withFirebase} from '../components/Firebase';
import imageDummy from '../images/kafka.jpg';
import userProfile from '../images/kafka.jpg';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {GoogleApiWrapper} from 'google-maps-react';
import {
  faStar,
  faStarHalf,
  faLocationArrow,
  faMapPin
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const book_id = 'niK1Q2TzWqffiZVj1YrA';

const BookDetailComponent = props => {
  const [loading, setLoading] = useState(false);
  const [book, setBooks] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    fetchBookInfo();
    // fetchOwnerInfo();
  }, []);

  const fetchBookInfo = () => {
    setLoading(true);
    var bookDetail = props.firebase.book(book_id);
    bookDetail
      .get()
      .then(book => {
        if (book.exists) {
          setLoading(false);
          setBooks(book.data());
          fetchOwnerInfo(book.data().owner);
          console.log('book data', book.data());
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
          console.log(owner.data(), 'owner data');
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
      <BookDetail book={book} owner={owner} firebase={props.firebase} />
    </div>
  );
};

const getStars = rating => {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (let i = rating; i > 0; i--)
    // If there is a half a star, append it
    if (i === 0.5) {
      output.push(<FontAwesomeIcon icon={faStarHalf} color="#e99407" />);
    } else {
      output.push(<FontAwesomeIcon icon={faStar} color="#e99407" />);
    }
  return output;
};

const BookDetail = ({book, owner, firebase}) => {
  const requestBook = () => {
    firebase
      .transactions()
      .add({
        providerID: book.owner,
        consumerID: firebase.getMyUID(),
        status: 'Ongoing',
        requestTime: new Date().getTime(),
        itemID: book_id,
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
        <div className="title">
          <div className="book-title">
            {String(book.title).substring(20, 0)}...
          </div>
          <button className="book-type">
            {' '}
            {String(book.type).toUpperCase()}
          </button>
        </div>
        <div className="author">by {book.author}</div>

        <div id="goodreads-info">
          <div className="rating">
            {getStars(book.rating)} {book.rating}
          </div>
        </div>

        <div className="book-info">
          <img className="book-img" src={book.imageUrls} alt={book.title} />
        </div>
        <div className="header-description">Description </div>
        <div className="service-description">{book.description}</div>
      </div>
      <div className="book-pickup-container">
        <div className="header-pickup">Pickup Information </div>
        <span className="location-to-pick">
          <FontAwesomeIcon icon={faMapPin} />
          {'  ' + book.location}
        </span>

        <div className="google-map-wrapper">
          <GoogleMap />
        </div>

        <div className="distance">
          <FontAwesomeIcon icon={faLocationArrow} />
          {'  ' + book.distance}
          {/* <i class ="fa fa-location-arrow" aria-hidden="true"></i> */}
        </div>
        <br />
        <br />
        <div className="user-info">
          <img className="user-profile" src={book.userProfile} alt="" />
          <div className="user-name">{owner.username}</div>
        </div>

        <button className="btn-request btn" onClick={requestBook}>
          Request
        </button>
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
