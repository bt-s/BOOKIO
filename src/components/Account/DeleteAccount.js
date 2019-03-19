import React, {useRef, useReducer} from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Button from '../Button/Button';

const DeleteAccountBase = props => {
  const onDelete = e => {
    props.firebase.auth.currentUser.delete().catch(error => {
      alert(error);
    });
  };

  return <Button onClick={onDelete} text={`Delete my account`} />;
};

const DeleteAccount = withFirebase(DeleteAccountBase);

export default DeleteAccount;
