import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Password forget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onsubmit = e => {
    const {email} = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({...INITIAL_STATE});
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
    const {email, error} = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          placeholder="Email address"
          name="email"
          type="text"
          onChange={this.onChange}
          value={this.state.email}
        />
        <button disabled={isInvalid} type="submit">
          Reset my password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.object
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};
