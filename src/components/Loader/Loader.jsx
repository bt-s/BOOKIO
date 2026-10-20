import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({className = 'loader'}) => {
  return <div className={className} />;
};


Loader.propTypes = {
  className: PropTypes.string
};

export default Loader;
