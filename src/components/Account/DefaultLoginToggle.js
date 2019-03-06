import React from 'react';
import PropTypes from 'prop-types';

import {useFormInput} from '../../hooks/hooks';

import Button from '../Button/Button';

const DefaultLoginToggle = props => {
  const passwordOne = useFormInput('');
  const passwordTwo = useFormInput('');

  const onSubmit = e => {
    e.preventDefault();

    props.onLink(passwordOne);
  };

  const {onlyOneLeft, isEnabled, signInMethod, onUnlink} = props;

  const isInvalid =
    passwordOne.value !== passwordTwo.value || passwordOne === '';

  return isEnabled ? (
    <Button
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
      text={`Deactivate ${signInMethod.id}`}
    />
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
        text={`Link ${signInMethod.id}`}
      />
    </form>
  );
};

DefaultLoginToggle.propTypes = {
  onlyOneLeft: PropTypes.bool,
  isEnabled: PropTypes.bool,
  signInMethod: PropTypes.object,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func
};

export default DefaultLoginToggle;
