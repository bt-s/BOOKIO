import React from 'react';

import {AuthUserContext, withAuthorization} from '../Session/Session';

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

export default withAuthorization(condition)(AccountPage);
