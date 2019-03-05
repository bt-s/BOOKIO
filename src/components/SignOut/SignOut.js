import React from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

const SignOutButton = props => (
  <button type="button" onClick={props.firebase.doSignOut}>
    Sign out
  </button>
);

SignOutButton.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(SignOutButton);
