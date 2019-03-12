import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Button from '../Button/Button';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetFormBase = props => {
  const [email, setEmail] = useState('');
  const [isResetRequested, setIsResetRequested] = useState(false);
  const [error, setError] = useState(null);

  const EMAIL_SENT = `
    An e-mail with a link to reset your password has been sent to ${email}.
  `;

  const onSubmit = e => {
    props.firebase
      .doPasswordReset(email)
      .then(() => setIsResetRequested(true))
      .catch(error => {
        setError(error);
      });

    e.preventDefault();
  };

  const onChange = e => {
    setEmail(e.target.value);
  };

  const isInvalid = email === '';

  return isResetRequested ? (
    <p>{EMAIL_SENT}</p>
  ) : (
    <form onSubmit={onSubmit} className="auth-form">
      <p className="pw-forget-header">
        Enter your email address and we will send you a link to reset your
        password.
      </p>
      <p className="form-header">E-mail address</p>
      <input
        placeholder=""
        name="email"
        type="text"
        onChange={onChange}
        value={email}
      />
      <Button
        className="btn btn-auth"
        disabled={isInvalid}
        type="submit"
        onClick={onSubmit}
        text="Sent password reset email"
      />

      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.object
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

const PasswordForgetLink = props => (
  <Link className={props.styling} to={ROUTES.PASSWORD_FORGET}>
    Forgot password?
  </Link>
);

PasswordForgetLink.propTypes = {
  styling: PropTypes.string
};

export {PasswordForgetForm, PasswordForgetLink};
