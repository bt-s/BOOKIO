import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {useFormInput} from '../../hooks/hooks';
import {SignUpLink} from '../SignUp/SignUp';
import {PasswordForgetLink} from '../PasswordForget/PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInFacebook />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const SignInFacebookBase = props => {
  const [error, setError] = useState(null);

  const onSubmit = e => {
    props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        setError(null);
        props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setError(error);
      });

    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign in with Facebook</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInFormBase = props => {
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const onSubmit = e => {
    props.firebase
      .doSignInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        setError(error);
      });

    e.preventDefault();
  };

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Email address" name="email" type="text" {...email} />
      <input
        placeholder="Password"
        name="password"
        type="password"
        {...password}
      />
      <button disabled={isInvalid} type="submit">
        Sign in
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

SignInFormBase.propTypes = {
  firebase: PropTypes.object
};

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);

export default SignInPage;

export {SignInForm, SignInFacebook};
