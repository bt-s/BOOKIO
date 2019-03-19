import React, {useReducer, useState} from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

import Button from '../Button/Button';
import {formReducer, errorReducer} from '../../helpers/validationHelper';

const PasswordChangeForm = props => {
  const initialFormValues = () => ({
    passwordOne: '',
    passwordTwo: '',
    isReset: false
  });

  const [isReset, setIsReset] = useState(false);
  const [form, dispatchForm] = useReducer(formReducer, {}, initialFormValues);
  const [error, dispatchError] = useReducer(errorReducer, {});

  const handleChange = e => {
    dispatchForm({
      name: e.target.name,
      value: e.target.value
    });
  };

  const onSubmit = e => {
    props.firebase
      .doPasswordUpdate(form.passwordOne, form.passwordTwo)
      .then(() => {
        form.passwordOne = '';
        form.passwordTwo = '';
        setIsReset(true);
      })
      .catch(error => {
        dispatchError(error);
      });

    e.preventDefault();
  };

  return isReset ? (
    <p>Your password has been reset.</p>
  ) : (
    <form onSubmit={onSubmit}>
      <label className="form-header">New password</label>
      <input
        name="passwordOne"
        type="password"
        placeholder=""
        value={form.passwordOne}
        onChange={handleChange}
      />
      <label className="form-header">Confirm new password</label>
      <input
        name="passwordTwo"
        type="password"
        placeholder=""
        value={form.passwordTwo}
        onChange={handleChange}
      />

      {error.code ? <p>{error.message}</p> : ''}
      <Button type="submit" onClick={onSubmit} text="Reset my password" />
    </form>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(PasswordChangeForm);
