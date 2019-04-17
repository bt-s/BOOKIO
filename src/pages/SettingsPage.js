import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  withAuthorization,
  withEmailVerification
} from '../components/Session/Session';

import LoginManagement from '../components/Account/LoginManagement';
import PasswordChangeForm from '../components/PasswordChange/PasswordChange';

const SettingsPage = props => (
  <div className="account-page">
    <h1>Settings</h1>
    <div className="user-information">
      <div className="sub-header-account">Change Password</div>
      <PasswordChangeForm />
    </div>
    <div className="line-break-sm" />
    <div className="user-information">
      <div className="sub-header-account"> Manage Account</div>
      <LoginManagement authUser={props.authUser} />
    </div>
  </div>
);

SettingsPage.propTypes = {
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
)(SettingsPage);
