import React from 'react';

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
        style={inputStyle}
      />
      <label class="radio-label" for={props.id} style={labelStyle}>
        {props.label}
      </label>
    </div>
  );
};

export default Radio;
