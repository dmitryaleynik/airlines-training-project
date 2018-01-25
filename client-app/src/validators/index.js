export const emailValidator = email => {
  if (!email) {
    return 'Email is required!';
  }
  if (!/^[a-z][a-z0-9]*@[a-z0-9]+\.[a-z]+$/i.test(email)) {
    return 'Email is invalid!';
  }
  return '';
};

export const passwordValidator = password => {
  if (!password) {
    return 'Password is required!';
  }
  if (password.length < 6) {
    return 'Password is too short!';
  }
  return '';
};
