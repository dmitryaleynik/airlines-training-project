import FetchRequest from './FetchRequest';

export default (token) => {
  return new FetchRequest('/cities', token).get();
};
