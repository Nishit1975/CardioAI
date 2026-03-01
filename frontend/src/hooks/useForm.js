import { useState, useCallback } from 'react';

const initialValues = {
  age: '', gender: '', height: '',
  weight: '', ap_hi: '', ap_lo: '',
};

const validators = {
  age: (v) => !v ? 'Required' : (v < 1 || v > 120) ? 'Must be 1–120' : null,
  gender: (v) => (v === '' || v === null || v === undefined) ? 'Required' : null,
  height: (v) => !v ? 'Required' : (v < 50 || v > 250) ? 'Must be 50–250 cm' : null,
  weight: (v) => !v ? 'Required' : (v < 10 || v > 300) ? 'Must be 10–300 kg' : null,
  ap_hi: (v) => !v ? 'Required' : (v < 60 || v > 250) ? 'Must be 60–250 mmHg' : null,
  ap_lo: (v) => !v ? 'Required' : (v < 40 || v > 200) ? 'Must be 40–200 mmHg' : null,
};

export const useForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validators[name]?.(value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validators[name]?.(value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const validateAll = useCallback(() => {
    const newErrors = {};
    Object.keys(validators).forEach(key => {
      const error = validators[key]?.(values[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched(Object.keys(initialValues).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, []);

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset };
};