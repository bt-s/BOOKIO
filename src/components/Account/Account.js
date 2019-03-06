import React from 'react';
import {compose} from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../Session/Session';

import LoginManagement from './LoginManagement';
import PasswordChangeForm from '../PasswordChange/PasswordChange';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email} </h1>
        <PasswordChangeForm />
        <LoginManagement authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
