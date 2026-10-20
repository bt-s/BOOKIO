import React from 'react';
import PropTypes from 'prop-types';

const Radio = props => {
  const inputStyle = {
    position: 'absolute',
    clip: 'rect(0,0,0,0)'
  };
  const labelStyle = {
    // border: '2px solid black'
  };
  return (
    <div className="radio-styled">
      <input
        type="radio"
        value={props.value}
        name={props.name}
        id={props.id}
        checked={props.checked}
        style={inputStyle}
        onChange={props.onChange}
      />
      <label
        className="radio-label"
        htmlFor={props.id}
        style={labelStyle}
        type="submit">
        {props.label}
      </label>
    </div>
  );
};
Radio.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default Radio;
