import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button
    className={props.className}
    id={props.id}
    onClick={props.onClick}
    type={props.type}>
    {props.text}
  </button>
);

Button.defaultProps = {
  className: '',
  text: '',
  type: 'button'
};

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string
};

export default Button;
