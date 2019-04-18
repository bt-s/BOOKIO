import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {withFirebase} from '../components/Firebase';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  withAuthorization,
  withEmailVerification
} from '../components/Session/Session';

import Avatar from '../components/Account/Avatar';
import SearchResults from '../components/Books/SearchResults';

import {index} from '../components/Algolia';

const _ = require('lodash/core');

const AccountPage = props => {
  const [myBooks, setMyBooks] = useState([]);

  const fetchUserInventory = uid => {
    props.firebase
      .user(uid)
      .get()
      .then(doc =>
        Promise.all(
          doc.data().myBooks.map(
            id =>
              props.firebase
                .book(id)
                .get()
                .then(book => {
                  return book.exists ? {id, ...book.data()} : undefined;
                }) // insert id
          )
        )
      )
      .then(books => {
        setMyBooks(books.filter(book => book)); // filter out undefined one
      });
  };

  useEffect(() => {
    // onSearchBooks(props.authUser.uid);
    fetchUserInventory(props.authUser.uid);
  }, []);

  return (
    <div className="account-page">
      <h1>My Profile</h1>
      <div className="user-information">
        <Avatar avatarUrl={props.authUser.photoUrl} />
        <div className="user-info-container">
          <span className="username">Hey, I am {props.authUser.username} </span>
          <span className="info-item">
            <FontAwesomeIcon icon="envelope" />
            {props.authUser.email}
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon="phone" />
            {props.authUser.phoneNumber}
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon="home" />
            {props.authUser.location}
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon="birthday-cake" />
            {props.authUser.age}
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
      {myBooks ? (
        <SearchResults books={myBooks.reverse()} accountPage={true} />
      ) : <h2>You haven't added any books yet.</h2>}
    </div>
  );
};

AccountPage.propTypes = {
  authUser: PropTypes.object
};

const condition = authUser => !!authUser;

export default compose(
  withRouter,
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
