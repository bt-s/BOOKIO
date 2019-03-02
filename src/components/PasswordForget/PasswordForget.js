import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../routes';

export default function PasswordForgetPage() {
  return (
    <div>
      <h1>Password forget</h1>
      <PasswordForgetForm />
    </div>
  );
}

const PasswordForgetFormBase = props => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = e => {
    props.firebase
      .doPasswordReset(email)
      .then(() => setEmail)
      .catch(error => {
        setError(error);
      });

    e.preventDefault();
  };

  const onChange = e => {
    setEmail(e.target.value);
  };

  const isInvalid = email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Email address"
        name="email"
        type="text"
        onChange={onChange}
        value={email}
      />
      <button disabled={isInvalid} type="submit">
        Reset my password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.object
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

const PasswordForgetLink = () => (
  <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
);

export {PasswordForgetForm, PasswordForgetLink};
