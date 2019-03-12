import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {useFormInput, useFormCheckbox} from '../../hooks/hooks';
import {withFirebase} from '../Firebase';

import Button from '../Button/Button';

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
  const username = useFormInput('');
  const email = useFormInput('');
  const passwordOne = useFormInput('');
  const passwordTwo = useFormInput('');
  const isAdmin = useFormCheckbox(false);
  const [error, setError] = useState(null);

  const onSubmit = e => {
    const usernameValue = username.value;
    const emailValue = email.value;
    const roles = [];

    if (isAdmin.checked) roles.push(ROLES.ADMIN);

    props.firebase
      .doCreateUserWithEmailAndPassword(email.value, passwordOne.value)
      .then(authUser => {
        return props.firebase.user(authUser.user.uid).set(
          {
            usernameValue,
            emailValue,
            roles
          },
          {merge: true}
        );
      })
      .then(authUser => {
        username.value = '';
        email.value = '';
        passwordOne.value = '';
        passwordTwo.value = '';
        props.history.push(ROUTES.ACCOUNT);
      })
      .then(() => {
        return props.firebase.doSendEmailVerification();
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setError(error);
      });

    e.preventDefault();
  };

  const isInvalid =
    passwordOne.value !== passwordTwo.value ||
    passwordOne.value === '' ||
    email.value === '' ||
    username.value === '';

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <p className="form-header">Full name</p>
      <input name="username" type="text" placeholder="" {...username} />
      <p className="form-header">E-mail</p>
      <input name="email" type="text" placeholder="" {...email} />
      <p className="form-header">Password</p>
      <input
        name="passwordOne"
        type="password"
        placeholder=""
        {...passwordOne}
      />
      <p className="form-header">Confirm password</p>
      <input
        name="passwordTwo"
        type="password"
        placeholder=""
        {...passwordTwo}
      />
      <label className="admin-label">
        Admin:
        <input name="isAdmin" type="checkbox" {...isAdmin} />
      </label>
      <Button
        className="btn btn-auth"
        disabled={isInvalid}
        type="submit"
        text="Sign up"
      />

      {error && <p>{error.message}</p>}
    </form>
  );
};

SignUpFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
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
