import React from 'react';

import BrandLogo from '../components/BrandLogo/BrandLogo';
import {PasswordForgetForm} from '../components/Authentication/PasswordForget';

const PasswordForgetPage = () => (
  <div className="auth-page pw-forget">
    <div className="auth-page-header">
      <BrandLogo styling="secondary" />
      <h1>Password forget</h1>
    </div>

    <div className="auth-page-body">
      <PasswordForgetForm />
    </div>
  </div>
);

export default PasswordForgetPage;