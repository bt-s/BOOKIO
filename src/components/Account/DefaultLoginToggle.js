import React, {useRef, useReducer} from 'react';
import PropTypes from 'prop-types';

import {
  Validation,
  Validator,
  ValidationHelper
} from '../Authentication/Validation';
import {formReducer, errorReducer} from '../../helpers/validationHelper';

import Button from '../Button/Button';

const DefaultLoginToggle = props => {
  const {onlyOneLeft, isEnabled, signInMethod, onUnlink} = props;

  const initialFormValues = () => ({
    passwordOne: '',
    passwordTwo: ''
  });

  const validationRef = useRef(null);

  const [form, dispatchForm] = useReducer(formReducer, {}, initialFormValues);
  const [error, dispatchError] = useReducer(errorReducer, {});

  const handleChange = e => {
    dispatchForm({
      name: e.target.name,
      value: e.target.value
    });
  };

  const onValidate = error => {
    dispatchError(error);
  };

  const onSubmit = e => {
    e.preventDefault();
    validationRef.current.validate();
    props.onLink(form.passwordOne);
  };

  return isEnabled ? (
    <Button
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
      text={`Deactivate ${signInMethod.method}`}
    />
  ) : (
    <Validation ref={validationRef}>
      <form onSubmit={onSubmit}>
        {error.passwordOne && <span>{error.passwordOne}</span>}
        <label htmlFor="" className="form-header">
          New password
        </label>
        <Validator
          name="passwordOne"
          value={form.passwordOne}
          validations={[ValidationHelper.required('Password is required')]}
          onValidate={onValidate}>
          <input
            name="passwordOne"
            type="password"
            placeholder=""
            value={form.passwordOne}
            onChange={handleChange}
          />
        </Validator>

        {error.passwordTwo && <span>{error.passwordTwo}</span>}
        <label htmlFor="" className="form-header">
          Confirm new password
        </label>
        <Validator
          name="passwordTwo"
          value={form.passwordTwo}
          validations={[
            ValidationHelper.required('Password confirmation is required')
          ]}
          onValidate={onValidate}>
          <input
            name="passwordTwo"
            type="password"
            placeholder=""
            value={form.passwordTwo}
            onChange={handleChange}
          />
        </Validator>
        <Button type="submit" text={`Link ${signInMethod.id}`} />
      </form>
    </Validation>
  );
};

DefaultLoginToggle.propTypes = {
  onlyOneLeft: PropTypes.bool,
  isEnabled: PropTypes.bool,
  signInMethod: PropTypes.object,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func
};

export default DefaultLoginToggle;
