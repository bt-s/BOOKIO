import React from 'react';

import {withFirebase} from '../Firebase';

const SignOutbutton = ({firebase}) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign out
  </button>
);

export default withFirebase(SignOutbutton);
