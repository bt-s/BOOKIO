import React, {useReducer, useRef} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {compose} from 'recompose';

import Button from '../Button/Button';
import {PasswordForgetLink} from './PasswordForget';
import {Validation, Validator, ValidationHelper} from '../Forms/Validation';
import {formReducer, errorReducer} from '../../helpers/validationHelper';

import * as ROUTES from '../../constants/routes';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const SignInFacebookBase = props => {
  const [error, dispatchError] = useReducer(errorReducer, {});

  const onSubmit = e => {
    props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Only create a new DB instance on first FB sign in
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          return props.firebase.user(socialAuthUser.user.uid).set(
            {
              username: socialAuthUser.user.displayName,
              email: socialAuthUser.user.email,
              age: '',
              location: '',
              phoneNumber: '',
              photoUrl: socialAuthUser.user.photoURL,
              transactions: [],
              myBooks: [],
              items: []
            },
            {merge: true}
          );
        }
      })
      .then(() => {
        dispatchError(null);
        props.history.push(ROUTES.ACCOUNT);
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
    <form onSubmit={onSubmit} className="sign-in-facebook-form">
      <Button
        className="btn btn-auth btn-facebook"
        type="submit"
        icon={<FontAwesomeIcon icon={faFacebookF} />}
        text="Login with Facebook"
      />
      {error.code ? (
        <p className="form-submission-error">ERROR: {error.message}</p>
      ) : (
        ''
      )}
    </form>
  );
};

SignInFacebookBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const SignInFormBase = props => {
  const initialFormValues = () => ({
    email: '',
    password: ''
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
    validationRef.current.validate();
    props.firebase
      .doSignInWithEmailAndPassword(form.email, form.password)
      .then(() => {
        props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        dispatchError(error);
      });

    e.preventDefault();
  };

  return (
    <Validation ref={validationRef}>
      <form onSubmit={onSubmit} className="auth-form">
        {error.email && <span className="validation-error">{error.email}</span>}
        <Validator
          name="email"
          value={form.email}
          validations={[ValidationHelper.required('Email is required')]}
          onValidate={onValidate}>
          <input
            placeholder="E-mail"
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
          />
        </Validator>

        {error.password && (
          <span className="validation-error">{error.password}</span>
        )}

        <Validator
          name="password"
          value={form.password}
          validations={[ValidationHelper.required('Password is required')]}
          onValidate={onValidate}>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </Validator>

        <PasswordForgetLink styling="pw-forget-link" />
        <Button className="btn btn-auth" type="submit" text="Login" />
        {error.code ? (
          <p className="form-submission-error">ERROR: {error.message}</p>
        ) : (
          ''
        )}
      </form>
    </Validation>
  );
};

SignInFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
};

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);

export {SignInForm, SignInFacebook};
