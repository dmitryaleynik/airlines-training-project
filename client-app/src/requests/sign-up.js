import FetchRequest from './FetchRequest';

export default (email, password) => {
  return new FetchRequest('/sign-up').post({ email, password, });
};
