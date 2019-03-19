import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session/Session';

import Avatar from '../components/Account/Avatar';
import LoginManagement from '../components/Account/LoginManagement';
import PasswordChangeForm from '../components/PasswordChange/PasswordChange';

const AccountPage = props => {
  console.log(props);

  return (
    <div className="account-page">
      {/* <Avatar /> */}
      <Avatar avatarURL={props.authUser.photoURL} />
      <ul>
        Account:
        <li>UID: {props.authUser.uid}</li>
        <li>E-mail: {props.authUser.email}</li>
        <li>Username: {props.authUser.formUsername}</li>
        <li>Facebook username: {props.authUser.username}</li>
        <li>Roles: {props.authUser.roles}</li>
        <li>ProviderId: {props.authUser.providerData[0].providerId}</li>
        <li>FacebookPhotoURL: {props.authUser.providerData[0].photoURL}</li>
      </ul>
      <PasswordChangeForm />
      <LoginManagement authUser={props.authUser} />
    </div>
  );
};

AccountPage.propTypes = {
  authUser: PropTypes.object,
};

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
