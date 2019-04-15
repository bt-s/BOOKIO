import React from 'react';

import {PasswordForgetForm} from '../components/Authentication/PasswordForget';

const PasswordForgetPage = () => (
  <div className="auth-page pw-forget">
    <div className="auth-page-header">
      <h1>Forgot your password?</h1>
    </div>

    <div className="auth-page-body">
      <PasswordForgetForm />
    </div>
  </div>
);

export default PasswordForgetPage;
