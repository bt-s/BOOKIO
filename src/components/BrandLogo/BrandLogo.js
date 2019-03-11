import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const BrandLogo = props => (
  <Link to={ROUTES.LANDING} className={`navbar-brand ${props.styling}`}>
    <span className="left">{props.logoLeft}</span>
    <span className="right">{props.logoRight}</span>
  </Link>
);

BrandLogo.propTypes = {
  styling: PropTypes.string,
  logoLeft: PropTypes.string,
  logoRight: PropTypes.string
};

BrandLogo.defaultProps = {
  styling: 'primary',
  logoLeft: 'BOOK',
  logoRight: 'IO'
};

export default BrandLogo;
