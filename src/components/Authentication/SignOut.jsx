import React from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

import Button from '../Button/Button';

const SignOutButton = props => (
  <Button
    className="btn-sign-out"
    type="button"
    onClick={props.firebase.doSignOut}
    text="Sign Out"
  />
);

SignOutButton.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(SignOutButton);
