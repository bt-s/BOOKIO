import {useState} from 'react';

export function useFormInput() {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

export function useFormCheckbox() {
  const [checked, setChecked] = useState(false);

  function handleChange(e) {
    setChecked(e.target.checked);
  }

  return {
    checked,
    onChange: handleChange
  };
}
