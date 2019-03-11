import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button
    className={props.className}
    disabled={props.disabled}
    id={props.id}
    onClick={props.onClick}
    type={props.type}>
    {props.text}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string
};

Button.defaultProps = {
  className: 'btn',
  disabled: false,
  text: '',
  type: 'button'
};

export default Button;
