import {
  required,
  email,
  length,
  confirmation,
  numericality,
} from 'redux-form-validators';

const validations = {
  email: [required(), email(),],
  password: [required(), length({ min: 6, }),],
  confirmPassword: [
    confirmation({ field: 'password', fieldLabel: 'Password', }),
  ],
  'city-from': [required(),],
  'city-to': [required(),],
  seats: [numericality({ '>=': 1, }),],
};

export default (values) => {
  const errors = {};
  for (let field in validations) {
    let value = values[field];
    errors[field] = validations[field]
      .map((validateField) => {
        return validateField(value, values);
      })
      .find((x) => x);
  }
  return errors;
};
