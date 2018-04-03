import FetchRequest from './FetchRequest';

export default (token) => {
  return new FetchRequest('/orders', token).get();
};
