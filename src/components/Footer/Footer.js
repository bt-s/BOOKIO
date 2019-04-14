import React from 'react';
import {withRouter} from 'react-router-dom';

import BrandLogo from '../BrandLogo/BrandLogo';

const Footer = props => {
  return (
    <footer>
      <div className="footer-content-container">
        <p>
          An endeavour for the <i>Interaction Programming and Dynamic Web</i>{' '}
          course, 2019
        </p>
        <div className="copyright">
          <span>&copy;</span>
          <BrandLogo styling="secondary" />
        </div>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
