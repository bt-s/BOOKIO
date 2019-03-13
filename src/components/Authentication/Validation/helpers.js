export const formReducer = (state, action) => {
  let newValue = {};
  newValue[action.name] = action.value;
  return Object.assign({}, state, newValue);
};

export const errorReducer = (allError, error) => {
  return Object.assign({}, allError, error);
};

export const numberValidation = value => {
  return isNaN(value.trim()) ? 'Value should be number' : '';
};

export const phoneNumberValidation = value => {
  return /[0-9]{10}/.test(value.trim()) ? '' : 'Invalid phone number';
};
