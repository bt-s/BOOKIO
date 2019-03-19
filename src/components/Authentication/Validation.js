// Credits: https://medium.com/@saravananr_93203/react-hooks-way-of-validating-a-form-2724d8bb4203

import React, {useEffect, useImperativeHandle, forwardRef, useRef} from 'react';

// Function responsible for checking overall validity of the form
export const Validation = forwardRef(({children}, ref) => {
  const validatorRefs = useRef({});

  const validate = () => {
    let allError = {};
    Object.values(validatorRefs.current).forEach(validationRef => {
      let error = validationRef.validate();
      allError = Object.assign(allError, error);
    });
    return allError;
  };

  // Customizes the instance value that is exposed to parent components when using ref
  useImperativeHandle(
    ref,
    () => ({
      validate
    }),
    []
  );

  const getChildrenRef = validator => {
    return validatorRef => {
      if (!validatorRef) {
        Reflect.deleteProperty(validatorRefs.current, validator.props.name);
        return;
      }
      validatorRefs.current[validator.props.name] = validatorRef;
    };
  };

  const getValidationChildRef = children => {
    validatorRefs.current = {};

    if (!children) return children;
    const type = typeof children;

    if (type === 'boolean' || type === 'string' || type === 'number') {
      return children;
    }

    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child && child.type === Validator) {
        return React.cloneElement(child, {ref: getChildrenRef(child)});
      } else if (child.props.children) {
        let result = getValidationChildRef(child.props.children);

        if (result.length === 0) {
          return child;
        } else if (result.length === 1) {
          result = result[0];
        }

        return React.cloneElement(child, {}, result);
      }

      return child;
    });
  };

  return getValidationChildRef(children);
});

// Function responsible for validating individual form field values
export const Validator = forwardRef(
  ({name, value, validations = [], onValidate = () => {}, children}, ref) => {
    let valueRef = useRef(value);

    useEffect(() => {
      if (isDifferent(valueRef.current, value)) {
        valueRef.current = value;
        validate();
      }
    });

    const validate = () => {
      let error = {};
      for (let validation of validations) {
        error[name] = validation(value);
        if (error[name]) break;
      }
      onValidate(error);
      return error;
    };

    useImperativeHandle(ref, () => ({
      validate
    }));

    const isDifferent = (oldValue, newValue) => {
      if (Array.isArray(oldValue)) {
        return oldValue.length !== newValue.length;
      }

      return oldValue !== newValue;
    };

    return children;
  }
);

// Helper object containing methods for basic validation on form values
export const ValidationHelper = {
  required: (errorMessage = 'Value is required') => {
    return value => {
      return Boolean(value) ? '' : errorMessage;
    };
  }
};
