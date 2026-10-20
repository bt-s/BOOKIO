import React from 'react';
import {useFirebase} from '../Firebase';
import {deleteUser} from 'firebase/auth';

import Button from '../Button/Button';

const DeleteAccount = () => {
  const firebase = useFirebase();

  const onDelete = e => {
    deleteUser(firebase.auth.currentUser).catch(error => {
      alert(error);
    });
  };

  return <Button onClick={onDelete} text={`Delete My Account`} />;
};

export default DeleteAccount;
