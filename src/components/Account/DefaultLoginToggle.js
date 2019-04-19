import React, {useRef, useReducer} from 'react';
import PropTypes from 'prop-types';

import {Validation, Validator, ValidationHelper} from '../Forms/Validation';
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

  return (
    isEnabled && (
      <Button
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
        text={`Deactivate ${signInMethod.method}`}
      />
    )
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
