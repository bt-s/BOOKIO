import React, {useRef, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';

import Button from '../Button/Button';
import {Validation, Validator, ValidationHelper} from './Validation';
import {formReducer, errorReducer} from '../../helpers/validationHelper';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign-in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

const SignUpFormBase = props => {
  const initialFormValues = () => ({
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
  });

  const validationRef = useRef(null);

  const [form, dispatchForm] = useReducer(formReducer, {}, initialFormValues);
  const [error, dispatchError] = useReducer(errorReducer, {});

  const handleChange = e => {
    dispatchForm({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const onValidate = error => {
    dispatchError(error);
  };

  const onSubmit = e => {
    const roles = [];

    if (form.isAdmin.checked) roles.push(ROLES.ADMIN);

    validationRef.current.validate();

    props.firebase
      .doCreateUserWithEmailAndPassword(form.email, form.passwordOne)
      .then(authUser => {
        console.log(authUser, '\n authUser printed above');
        authUser.user
          .updateProfile({
            displayName: form.username,
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/bookio.appspot.com/o/images%2Frobot.png?alt=media&token=d0cc8a48-aaad-4e3b-9c08-3e341ed8165e',
          })
          .then(function() {
            // Update successful.
          })
          .catch(function(error) {
            // An error happened.
          });
        return props.firebase.user(authUser.user.uid).set(
          {
            username: form.username,
            email: form.email,
            roles,
          },
          {merge: true}
        );
      })
      .then(authUser => {
        form.username = '';
        form.email = '';
        form.passwordOne = '';
        form.passwordTwo = '';
        props.history.push(ROUTES.ACCOUNT);
      })
      .then(() => {
        return props.firebase.doSendEmailVerification();
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        dispatchError(error);
      });

    e.preventDefault();
  };

  return (
    <Validation ref={validationRef}>
      <form className="auth-form" onSubmit={onSubmit}>
        {error.username && (
          <span className="validation-error">{error.username}</span>
        )}
        <label htmlFor="" className="form-header">
          Full name
        </label>
        <Validator
          name="username"
          value={form.username}
          validations={[ValidationHelper.required('Full name is required')]}
          onValidate={onValidate}>
          <input
            name="username"
            type="text"
            placeholder=""
            value={form.username}
            onChange={handleChange}
          />
        </Validator>

        {error.email && <span className="validation-error">{error.email}</span>}
        <label htmlFor="" className="form-header">
          Email
        </label>
        <Validator
          name="email"
          value={form.email}
          validations={[ValidationHelper.required('Email is required')]}
          onValidate={onValidate}>
          <input
            name="email"
            type="text"
            placeholder=""
            value={form.email}
            onChange={handleChange}
          />
        </Validator>

        {error.passwordOne && (
          <span className="validation-error">{error.passwordOne}</span>
        )}
        <label htmlFor="" className="form-header">
          Password
        </label>
        <Validator
          name="passwordOne"
          value={form.passwordOne}
          validations={[ValidationHelper.required('Password is required')]}
          onValidate={onValidate}>
          <input
            name="passwordOne"
            type="password"
            placeholder=""
            value={form.passwordOne}
            onChange={handleChange}
          />
        </Validator>

        {error.passwordTwo && (
          <span className="validation-error">{error.passwordTwo}</span>
        )}
        <label htmlFor="" className="form-header">
          Confirm password
        </label>
        <Validator
          name="passwordTwo"
          value={form.passwordTwo}
          validations={[
            ValidationHelper.required('Password confirmation is required'),
          ]}
          onValidate={onValidate}>
          <input
            name="passwordTwo"
            type="password"
            placeholder=""
            value={form.passwordTwo}
            onChange={handleChange}
          />
        </Validator>

        <label htmlFor="" className="admin-label">
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            value={form.isAdmin}
            onChange={handleChange}
          />
        </label>
        <Button className="btn btn-auth" type="submit" text="Sign up" />

        {error.code ? (
          <p className="form-submission-error">ERROR: {error.message}</p>
        ) : (
          ''
        )}
      </form>
    </Validation>
  );
};

SignUpFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object,
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignInLink = () => (
  <p>
    Have an account? <Link to={ROUTES.LOG_IN}>Sign in here</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export {SignUpForm, SignInLink, SignUpLink};
