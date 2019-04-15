import React from 'react';
import PropTypes from 'prop-types';

const Address = props => (
  <div className="item-address">
    <span>{props.distance}</span>
    <span className="separator">{props.separator}</span>
    <span>{props.name}</span>
  </div>
);

Address.propTypes = {
  distance: PropTypes.string,
  separator: PropTypes.object,
  name: PropTypes.string
};

export default Address;
