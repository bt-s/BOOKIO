import React from 'react';

import {SignUpForm, SignInLink} from '../components/Authentication/SignUp';
import {SignInFacebook} from '../components/Authentication/SignIn';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
    <SignInFacebook />
    <SignInLink />
  </div>
);

export default SignUpPage;
