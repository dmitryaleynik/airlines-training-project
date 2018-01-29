// @flow
export const emailValidator = (email: string) => {
  if (!email) {
    return 'Email is required!';
  }
  if (!/^[a-z][a-z0-9]*@[a-z0-9]+\.[a-z]+$/i.test(email)) {
    return 'Email is invalid!';
  }
  return null;
};

export const passwordValidator = (password: string) => {
  if (!password) {
    return 'Password is required!';
  }
  if (password.length < 6) {
    return 'Password is too short!';
  }
  return null;
};

export const confirmPasswordValidator = (
  password1: string,
  password2: string
) => {
  if (passwordValidator(password1)) {
    return '';
  }
  if (password2 !== password1) {
    return 'Passwords don\'t match!';
  }
  return null;
};
