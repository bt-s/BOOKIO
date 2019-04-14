import React from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

import Button from '../Button/Button';

const DeleteAccountBase = props => {
  const onDelete = e => {
    props.firebase.auth.currentUser.delete().catch(error => {
      alert(error);
    });
  };

  return <Button onClick={onDelete} text={`Delete My Account`} />;
};

DeleteAccountBase.propTypes = {
  firebase: PropTypes.object
};

const DeleteAccount = withFirebase(DeleteAccountBase);

export default DeleteAccount;
