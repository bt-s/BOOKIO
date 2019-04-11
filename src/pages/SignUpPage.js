import React from 'react';

import BrandLogo from '../components/BrandLogo/BrandLogo';
import {SignUpForm, SignInLink} from '../components/Authentication/SignUp';
import {SignInFacebook} from '../components/Authentication/SignIn';

const SignUpPage = () => (
  <div className="auth-page sign-up">
  
    <div className="auth-page-header">
      <h1>Start using</h1>
      <BrandLogo styling="secondary" />
    </div>
    
  <br/>
    <div className="auth-page-body">
      <SignUpForm />
      <div className="spacer">OR</div>
      <SignInFacebook />
    </div>

    <div className="sign-in-sign-up-link">
      <SignInLink />
    </div>
  </div>
);

export default SignUpPage;
