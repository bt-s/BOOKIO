import React from 'react';
import PropTypes from 'prop-types';

const Loader = props => {
  return <div className={props.className} />;
};

Loader.defaultProps = {
  className: 'loader'
};

Loader.propTypes = {
  className: PropTypes.string
};

export default Loader;
