import { required, email, length, confirmation, } from 'redux-form-validators';

const validations = {
  email: [required(), email(),],
  password: [required(), length({ min: 6, }),],
  confirmPassword: [
    confirmation({ field: 'password', fieldLabel: 'Password', }),
  ],
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
