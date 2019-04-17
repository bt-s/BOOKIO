import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {storeBooks} from '../redux/actions/storeBooks';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session/Session';

import Avatar from '../components/Account/Avatar';
import LoginManagement from '../components/Account/LoginManagement';
import PasswordChangeForm from '../components/PasswordChange/PasswordChange';
import SearchResults from '../components/Books/SearchResults';

import {index} from '../components/Algolia';

const AccountPage = props => {
  const onSearchBooks = uid => {
    index
      .search({
        query: uid,
      })
      .then(res => {
        props.storeBooks(res.hits);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    onSearchBooks(props.authUser.uid);
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
      <SearchResults books={props.books} accountPage={true} />
    </div>
  );
};

AccountPage.propTypes = {
  authUser: PropTypes.object,
};

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  books: state.booksState.books,
});

const mapDispatchToProps = dispatch => ({
  storeBooks: books => dispatch(storeBooks(books)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
