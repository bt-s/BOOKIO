import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {useFormInput} from '../../hooks/hooks';
import {SignUpLink} from '../SignUp/SignUp';
import {PasswordForgetLink} from '../PasswordForget/PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

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

export default SignInPage;

export {SignInForm};
