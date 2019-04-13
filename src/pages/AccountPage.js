import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  withAuthorization,
  withEmailVerification
} from '../components/Session/Session';

import Avatar from '../components/Account/Avatar';
import DeleteAccount from '../components/Account/DeleteAccount';
import LoginManagement from '../components/Account/LoginManagement';
import PasswordChangeForm from '../components/PasswordChange/PasswordChange';

const AccountPage = props => {
  return (
    <div className="account-page">
    <h1>Profile</h1>
      <div className="user-information">  
        <Avatar avatarURL={props.authUser.photoURL} />
        <div className="username-container">
          <span className="username-age">
            {props.authUser.username}
          </span>
          <span className="location">{props.authUser.email}</span>
        </div>
        <div className="user-info-container">
          <span className="info-item">
            <FontAwesomeIcon icon={faPhone} />
            {props.authUser.phoneNumber}
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon={faEnvelope} />
            {props.authUser.email}
          </span>
        </div>
      </div>
      <h1>Change Password</h1>
      <PasswordChangeForm />
      <h1>Settings</h1>
      <LoginManagement authUser={props.authUser} />
      <DeleteAccount />
    </div>
  );
};

AccountPage.propTypes = {
  authUser: PropTypes.object
};

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
