import React, {useState} from 'react';
import PropTypes from 'prop-types';

const isRegularType = type => ['reset', 'submit', 'button'].includes(type);

const Button = props => {
  const [pushed, setPushed] = useState(false);

  return (
    <button
      className={props.className + ' ' + (pushed ? 'on' : 'off')}
      disabled={props.disabled}
      id={props.id}
      onClick={() => {
        if (props.type === 'toggle') {
          setPushed(!pushed);
        }
        if (props.onClick) {
          props.onClick();
        }
      }}
      type={isRegularType(props.type) ? props.type : 'button'}>
      {props.icon}
      {props.text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  className: 'btn',
  disabled: false,
  text: '',
  type: 'button'
};

export default Button;
