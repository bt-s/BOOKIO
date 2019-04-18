import React, {useRef, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';

import Button from '../Button/Button';
import {Validation, Validator, ValidationHelper} from '../Forms/Validation';
import {formReducer, errorReducer} from '../../helpers/validationHelper';

import * as ROUTES from '../../constants/routes';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this e-mail address already exists.
  Try to login with this account instead.
`;

const SignUpFormBase = props => {
  const initialFormValues = () => ({
    username: '',
    email: '',
    location: '',
    passwordOne: '',
    passwordTwo: ''
  });

  const validationRef = useRef(null);

  const [form, dispatchForm] = useReducer(formReducer, {}, initialFormValues);
  const [error, dispatchError] = useReducer(errorReducer, {});

  const handleChange = e => {
    dispatchForm({
      name: e.target.name,
      value: e.target.value
    });
  };

  const onValidate = error => {
    dispatchError(error);
  };

  const onSubmit = e => {
    const transactions = [];
    const myBooks = [];
    const phoneNumber = null;
    const age = null;

    const allErrors = validationRef.current.validate();

    if (JSON.stringify(allErrors) === JSON.stringify(initialFormValues())) {
      props.firebase
        .doCreateUserWithEmailAndPassword(form.email, form.passwordOne)
        .then(authUser => {
          authUser.user.updateProfile({
            displayName: form.username,
            photoUrl: process.env.REACT_APP_DEFAULT_PORTRAIT
          });
          return props.firebase.user(authUser.user.uid).set(
            {
              age,
              email: form.email,
              username: form.username,
              location: form.location,
              phoneNumber,
              photoUrl: process.env.REACT_APP_DEFAULT_PORTRAIT,
              transactions,
              myBooks,
              items: []
            },
            {merge: true}
          );
        })
        .then(authUser => {
          form.username = '';
          form.email = '';
          form.location = '';
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
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Validation ref={validationRef}>
      <form className="auth-form sign-up" onSubmit={onSubmit}>
        {error.username && (
          <span className="validation-error">{error.username}</span>
        )}

        <Validator
          name="username"
          value={form.username}
          validations={[ValidationHelper.required('Full name is required')]}
          onValidate={onValidate}>
          <input
            name="username"
            type="text"
            size="30"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
          />
        </Validator>
        {error.email && <span className="validation-error">{error.email}</span>}

        <Validator
          name="email"
          value={form.email}
          validations={[ValidationHelper.required('Email is required')]}
          onValidate={onValidate}>
          <input
            name="email"
            type="text"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
          />
        </Validator>

        {error.location && (
          <span className="validation-error">{error.location}</span>
        )}
        <Validator
          name="location"
          value={form.location}
          validations={[ValidationHelper.required('Location is required')]}
          onValidate={onValidate}>
          <input
            name="location"
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />
        </Validator>
        {error.passwordOne && (
          <span className="validation-error">{error.passwordOne}</span>
        )}

        <Validator
          name="passwordOne"
          value={form.passwordOne}
          validations={[ValidationHelper.required('Password is required')]}
          onValidate={onValidate}>
          <input
            name="passwordOne"
            type="password"
            placeholder="Password"
            value={form.passwordOne}
            onChange={handleChange}
          />
        </Validator>
        {error.passwordTwo && (
          <span className="validation-error">{error.passwordTwo}</span>
        )}

        <Validator
          name="passwordTwo"
          value={form.passwordTwo}
          validations={[ValidationHelper.required('Confirmation is required')]}
          onValidate={onValidate}>
          <input
            name="passwordTwo"
            type="password"
            placeholder="Confirm Password"
            value={form.passwordTwo}
            onChange={handleChange}
          />
        </Validator>

        <Button className="btn btn-auth" type="submit" text="Register" />
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
  history: PropTypes.object
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Register</Link>{' '}
  </p>
);

const SignInLink = () => (
  <p>
    Have an account? <Link to={ROUTES.LOG_IN}>Login here</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export {SignUpForm, SignInLink, SignUpLink};
