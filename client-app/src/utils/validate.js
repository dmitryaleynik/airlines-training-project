import {
  required,
  email,
  length,
  confirmation,
  numericality,
} from 'redux-form-validators';
import { USERNAME_MIN_LENGTH, } from 'src/imports';

const validations = {
  email: [required(), email(),],
  username: [required(), length({ min: USERNAME_MIN_LENGTH, }),],
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
