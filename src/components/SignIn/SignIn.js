import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp/SignUp';
import {PasswordForgetLink} from '../PasswordForget/PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = e => {
    const {email, password} = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        this.setState({error});
      });

    e.preventDefault();
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    const {email, password, error} = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          placeholder="Email address"
          name="email"
          type="text"
          onChange={this.onChange}
          value={email}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={this.onChange}
          value={password}
        />
        <button disabled={isInvalid} type="submit">
          Sign in
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export {SignInForm};
