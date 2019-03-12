import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {useFormInput} from '../../hooks/hooks';
import BrandLogo from '../BrandLogo/BrandLogo';
import Button from '../Button/Button';
import {SignUpLink} from '../SignUp/SignUp';
import {PasswordForgetLink} from '../PasswordForget/PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {faFacebookF} from '@fortawesome/free-brands-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const SignInPage = () => (
  <div className="sign-in-page">
    <div className="sign-in-header">
      <h1>Sign in to</h1>
      <BrandLogo styling="secondary" />
    </div>

    <div className="sign-in-body">
      <SignInForm />
      <div className="spacer">OR</div>
      <SignInFacebook />
    </div>

    <div className="sign-in-sign-up">
      <SignUpLink />
    </div>
  </div>
);

const SignInFacebookBase = props => {
  const [error, setError] = useState(null);

  const onSubmit = e => {
    props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        return props.firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: []
          },
          {merge: true}
        );
      })
      .then(() => {
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
    <form onSubmit={onSubmit} className="sign-in-facebook-form">
      <Button
        className="btn btn-signin btn-facebook"
        type="submit"
        icon={<FontAwesomeIcon icon={faFacebookF} />}
        text="Sign in with Facebook"
      />
      {error && <p>{error.message}</p>}
    </form>
  );
};

SignInFacebookBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object
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
    <form onSubmit={onSubmit} className="sign-in-email-form">
      <p className="form-header">E-mail</p>
      <input placeholder="" name="email" type="text" {...email} />
      <p className="form-header">Password</p>
      <input placeholder="" name="password" type="password" {...password} />
      <PasswordForgetLink styling="pw-forget-link" />
      <Button
        className="btn btn-signin"
        disabled={isInvalid}
        type="submit"
        text="Sign in"
      />

      {error && <p>{error.message}</p>}
    </form>
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

export default SignInPage;

export {SignInForm, SignInFacebook};
