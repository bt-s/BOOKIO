import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const DefaultLoginToggle = props => {
  const {onlyOneLeft, isEnabled, signInMethod, onUnlink} = props;

  return (
    isEnabled && (
      <Button
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
        text={`Deactivate ${signInMethod.method}`}
      />
    )
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
