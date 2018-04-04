import FetchRequest from './FetchRequest';

export default (email, password) => {
  return new FetchRequest('/sign-in').post({ email, password, role: 'user', });
};
