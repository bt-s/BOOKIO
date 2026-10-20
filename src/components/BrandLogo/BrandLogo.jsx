import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const BrandLogo = ({styling = 'primary', logoLeft = 'BOOK', logoRight = 'IO'}) => (
  <Link to={ROUTES.LANDING} className={`navbar-brand ${styling}`}>
    <span className="left">{logoLeft}</span>
    <span className="right">{logoRight}</span>
  </Link>
);

BrandLogo.propTypes = {
  styling: PropTypes.string,
  logoLeft: PropTypes.string,
  logoRight: PropTypes.string
};


export default BrandLogo;
