import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {withAuthorization, withEmailVerification} from '../Session/Session';

import LoginManagement from './LoginManagement';
import PasswordChangeForm from '../PasswordChange/PasswordChange';

const AccountPage = props => (
  <div>
    <h1>Account: {props.authUser.email} </h1>
    <PasswordChangeForm />
    <LoginManagement authUser={props.authUser} />
  </div>
);

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
