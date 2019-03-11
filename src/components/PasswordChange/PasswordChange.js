import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {useFormInput} from '../../hooks/hooks';
import {withFirebase} from '../Firebase';

import Button from '../Button/Button';

const PasswordChangeForm = props => {
  const passwordOne = useFormInput('');
  const passwordTwo = useFormInput('');
  const [isReset, setIsReset] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = e => {
    props.firebase
      .doPasswordUpdate(passwordOne.value)
      .then(
        () => (passwordOne.value = ''),
        (passwordTwo.value = ''),
        setIsReset(true)
      )
      .catch(error => {
        setError(error);
      });

    e.preventDefault();
  };

  const isInvalid =
    passwordOne.value !== passwordTwo.value || passwordOne.value === '';

  return isReset ? (
    <p>Your password has been reset.</p>
  ) : (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        type="password"
        placeholder="New password"
        {...passwordOne}
      />
      <input
        name="passwordTwo"
        type="password"
        placeholder="Confirm new password"
        {...passwordTwo}
      />
      <Button
        disabled={isInvalid}
        type="submit"
        onClick={onSubmit}
        text="Reset my password"
      />

      {error && <p>{error.message}</p>}
    </form>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(PasswordChangeForm);
