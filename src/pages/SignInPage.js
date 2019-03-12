import React from 'react';

import BrandLogo from '../components/BrandLogo/BrandLogo';
import {SignInFacebook, SignInForm} from '../components/Authentication/SignIn';
import {SignUpLink} from '../components/Authentication/SignUp';

const SignInPage = () => (
  <div className="sign-in-page">
    <div className="sign-in-header">
      <h1>Sign in to</h1>
      <BrandLogo styling="secondary" />
    </div>

    <div className="sign-in-body">
      <SignInForm />
      <div className="spacer">OR</div>
      <SignInFacebook />
    </div>

    <div className="sign-in-sign-up">
      <SignUpLink />
    </div>
  </div>
);

export default SignInPage;
