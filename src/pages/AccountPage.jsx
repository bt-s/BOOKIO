import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getDoc} from 'firebase/firestore';
import * as ROUTES from '../constants/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  withAuthorization,
  withEmailVerification
} from '../components/Session/Session';

import {useFirebase} from '../components/Firebase';
import Avatar from '../components/Account/Avatar';
import SearchResults from '../components/Books/SearchResults';

const AccountPage = props => {
  const firebase = useFirebase();
  const [myBooks, setMyBooks] = useState([]);

  const fetchUserInventory = uid => {
    getDoc(firebase.user(uid))
      .then(doc =>
        Promise.all(
          doc.data().myBooks.map(id =>
            getDoc(firebase.book(id)).then(book => {
              return book.exists() ? {id, ...book.data()} : undefined;
            }) // insert id
          )
        )
      )
      .then(books => {
        setMyBooks(books.filter(book => book)); // filter out undefined one
      });
  };

  useEffect(() => {
    fetchUserInventory(props.authUser.uid);
  }, []);

  const email = props.authUser.email;
  const phoneNumber = props.authUser.phoneNumber;
  const location = props.authUser.location;
  const age = props.authUser.age;

  return (
    <div className="account-page">
      <h1>My Profile</h1>
      <div className="user-information">
        <Avatar avatarUrl={props.authUser.photoUrl} />
        <div className="user-info-container">
          <span className="username">Hey, I am {props.authUser.username} </span>
          <span className="info-item">
            <FontAwesomeIcon icon="envelope" />
            <span>{email}</span>
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon="phone" />
            <span>
              {phoneNumber !== null ? (
                phoneNumber
              ) : (
                <i>Tell us your phone number</i>
              )}
            </span>
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon="home" />
            <span>{location}</span>
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon="birthday-cake" />
            <span>{age !== null ? age : <i>Tell us your age</i>}</span>
          </span>
          <Link to={ROUTES.EDIT_PROFILE} className="edit-profile">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="line-break" />
      <div className="my-books-section">
        <h2>My Books</h2>
        <Link className="btn btn-add-book account" to={ROUTES.ADD_BOOK}>
          <span>Add Book</span>
        </Link>
      </div>
      {myBooks.length > 0 ? (
        <SearchResults books={myBooks.reverse()} accountPage={true} />
      ) : (
        <p className="no-results">You haven't added any books yet.</p>
      )}
    </div>
  );
};

AccountPage.propTypes = {
  authUser: PropTypes.object
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(
  withEmailVerification(AccountPage)
);
