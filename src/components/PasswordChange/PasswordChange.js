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
    e.preventDefault();
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
  };

  return isReset ? (
    <p className="pw-success">Your password has been updated.</p>
  ) : (
    <div className="pw-change">
      <form onSubmit={onSubmit} className="auth-form">
        <input
          name="passwordOne"
          type="password"
          placeholder="New Password"
          value={form.passwordOne}
          onChange={handleChange}
        />
        <input
          name="passwordTwo"
          type="password"
          placeholder="Confirm New Password"
          value={form.passwordTwo}
          onChange={handleChange}
        />
        <br />
        {error.code ? <p>{error.message}</p> : ''}
        <Button type="submit" text="Update" />
      </form>
    </div>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(PasswordChangeForm);
