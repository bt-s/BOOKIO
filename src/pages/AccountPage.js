import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {
  faPhone,
  faEnvelope,
  faHome,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session/Session';

import Avatar from '../components/Account/Avatar';
import LoginManagement from '../components/Account/LoginManagement';
import PasswordChangeForm from '../components/PasswordChange/PasswordChange';

const AccountPage = props => {
  return (
    <div className="account-page">
      <h1>My Profile</h1>
      <div className="user-information">
        <Avatar avatarURL={props.authUser.photoUrl} />
        <div className="user-info-container">
          <span className="username">Hey, I am {props.authUser.username} </span>
          <span className="info-item">
            <FontAwesomeIcon icon={faEnvelope} />
            {props.authUser.email}
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon="phone" />
            {props.authUser.phoneNumber}
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon={faHome} />
            {props.authUser.location}
          </span>
          <span className="info-item">
            <FontAwesomeIcon icon={faBirthdayCake} />
            {props.authUser.age}
          </span>
          <Link to={ROUTES.EDIT_PROFILE} className="edit-profile">
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="line-break" />
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
};

AccountPage.propTypes = {
  authUser: PropTypes.object,
};

AccountPage.defaultProps = {};

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
