import Request from './Request';

export default (email, password) => {
  return new Request('/sign-in').post({ email, password, });
};
