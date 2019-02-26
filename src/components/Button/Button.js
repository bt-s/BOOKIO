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

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string
};

Button.defaultProps = {
  className: 'btn',
  text: '',
  type: 'button'
};

export default Button;
