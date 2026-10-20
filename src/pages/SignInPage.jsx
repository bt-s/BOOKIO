import React from 'react';

import BrandLogo from '../components/BrandLogo/BrandLogo';
import {SignInFacebook, SignInForm} from '../components/Authentication/SignIn';
import {SignUpLink} from '../components/Authentication/SignUp';

const SignInPage = () => (
  <div className="auth-page sign-in">
    <div className="auth-page-header">
      <h1>Welcome back to</h1>
      <BrandLogo styling="secondary" />
    </div>

  <br/>

    <div className="auth-page-body">
      <SignInForm />
      <div className="spacer">OR</div>
      <SignInFacebook />
    </div>

    <div className="sign-in-sign-up-link">
      <SignUpLink />
    </div>
  </div>
);

export default SignInPage;
