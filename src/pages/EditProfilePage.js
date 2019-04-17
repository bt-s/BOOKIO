import React, {useRef, useReducer, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {errorReducer} from '../helpers/validationHelper';
import Button from '../components/Button/Button';
import {
  Validation,
  Validator,
  ValidationHelper,
} from '../components/Forms/Validation';

import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session/Session';

const EditProfilePage = props => {
  const validationRef = useRef(null);
  const [error, dispatchError] = useReducer(errorReducer, {});
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const onValidate = error => {
    dispatchError(error);
  };
  useEffect(() => {
    let userData = props.authUser;
    setUsername(userData.username);
    setAge(userData.age);
    setLocation(userData.location);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const roles = [];
    props.firebase.auth.currentUser
      .updateProfile({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        location: location,
        age: age,
        roles,
      })
      .then(function() {
        setUsername(username);
        setAge(age);
        setLocation(location);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        props.firebase
          .user(props.firebase.getMyUID())
          .update({
            username: username,
            email: email,
            phoneNumber: phoneNumber,
            location: location,
            age: age,
            roles,
          })
          .then(() => {
            let newUserData = {
              ...props.authUser,
              username: username,
              email: email,
              phoneNumber: phoneNumber,
              location: location,
              age: age,
            };
            window.localStorage.setItem(
              'authUser',
              JSON.stringify(newUserData)
            );
            props.onSetAuthUser(newUserData);
          })
          .then(() => {
            props.history.push(ROUTES.ACCOUNT);
          });
      });
  };
  return (
    <React.Fragment>
      <div className="edit-profile-page">
        <h1>Edit Profile</h1>
        <Validation ref={validationRef}>
          <form className="auth-form" onSubmit={onSubmit}>
            <div className="field-item">
              <label className="field-label">Full Name</label>
              <input
                className="field-input"
                placeholder=""
                value={username}
                name="username"
                type="text"
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="field-item">
              <label className="field-label">Email</label>
              <input
                className="field-input"
                placeholder=""
                value={email}
                name="email"
                type="text"
                readOnly
              />
            </div>
            <div className="field-item">
              <label className="field-label">Phone Number</label>
              <input
                className="field-input"
                placeholder=""
                value={phoneNumber}
                name="phoneNumber"
                type="number"
                onChange={e => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            {error.location && (
              <span className="validation-error">{error.location}</span>
            )}
            <Validator
              name="location"
              value={location}
              validations={[ValidationHelper.required('Location is required')]}
              onValidate={onValidate}>
              <div className="field-item">
                <label className="field-label">Location</label>
                <input
                  className="field-input"
                  placeholder=""
                  value={location}
                  name="location"
                  type="text"
                  onChange={e => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
            </Validator>
            <div className="field-item">
              <label className="field-label">Age</label>
              <input
                className="field-input"
                placeholder=""
                value={age}
                name="age"
                type="text"
                onChange={e => {
                  setAge(e.target.value);
                }}
              />
            </div>
            <br />
            <Button
              className="btn btn-auth"
              type="submit"
              text="Update Profile"
            />
            {error.code ? (
              <p className="form-submission-error">ERROR: {error.message}</p>
            ) : (
              ''
            )}
          </form>
        </Validation>
      </div>
    </React.Fragment>
  );
};
EditProfilePage.propTypes = {
  authUser: PropTypes.object,
};

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser => dispatch({type: 'AUTH_USER_SET', authUser}),
});

export default compose(
  withRouter,

  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withEmailVerification,
  withAuthorization(condition)
)(EditProfilePage);
