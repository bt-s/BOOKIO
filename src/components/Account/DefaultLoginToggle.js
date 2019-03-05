import React from 'react';
import PropTypes from 'prop-types';

import {useFormInput} from '../../hooks/hooks';

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
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}>
      Deactivate {signInMethod.id}
    </button>
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
      <button disabled={isInvalid} type="submit">
        Link {signInMethod.id}
      </button>
    </form>
  );
};

DefaultLoginToggle.propTypes = {
  onlyOneLeft: PropTypes.bool,
  isEnabled: PropTypes.bool,
  signInMethod: PropTypes.object,
  onUnlink: PropTypes.func
};

export default DefaultLoginToggle;
