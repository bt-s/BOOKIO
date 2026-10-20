import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {getDoc, addDoc, updateDoc} from 'firebase/firestore';

import GoogleMap from '../components/GoogleMap/GoogleMap';
import {useFirebase} from '../components/Firebase';
import UserLabel from '../components/Books/UserLabel';
import RatingStars from '../components/Books/RatingStars';
import Button from '../components/Button/Button';

import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const BookDetailContainer = () => {
  const firebase = useFirebase();
  const {bookId} = useParams();
  const [book, setBooks] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    fetchBookInfo(bookId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  const fetchOwnerInfo = ownerId => {
    getDoc(firebase.user(ownerId))
      .then(owner => {
        if (owner.exists()) {
          setOwner(owner.data());
        } else {
          console.error('Owner undefined');
        }
      })
      .catch(function(error) {
        console.error('Error getting document:', error);
      });
  };

  const fetchBookInfo = id => {
    getDoc(firebase.book(id))
      .then(bookDoc => {
        if (bookDoc.exists()) {
          setBooks(bookDoc.data());
          fetchOwnerInfo(bookDoc.data().ownerId);
        } else {
          console.error('No such document!');
        }
      })
      .catch(function(error) {
        console.error('Error getting document:', error);
      });
  };

  return (
    <BookDetail book={book} owner={owner} firebase={firebase} bookId={bookId} />
  );
};

const BookDetail = props => {
  const [requestBtnTxt, setRequestBtnTxt] = useState('Request');
  const {book, owner, firebase, bookId} = props;

  const requestBook = () => {
    const consumerID = firebase.getMyUID();
    getDoc(firebase.user(consumerID)).then(user => {
        const item =
          user.data().items &&
          user.data().items.filter(item => item === bookId);

        if (item && item.length > 0) {
          setRequestBtnTxt('Requested');
        } else {
          addDoc(firebase.transactions(), {
              providerID: book.ownerId,
              consumerID: consumerID,
              status: 'Ongoing',
              requestTime: new Date().getTime(),
              itemID: bookId,
              type: book.type // lend or give
            })
            .then(transac => {
              setRequestBtnTxt('Requested');
              updateDoc(firebase.user(consumerID), {
                transactions: (user.data().transactions || []).concat(
                  transac.id
                ),
                // items I requested
                items: (user.data().items || []).concat(bookId)
              });
              updateDoc(firebase.user(book.ownerId), {
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

export default BookDetailContainer;
