import FetchRequest from './FetchRequest';

export default (token) => {
  return new FetchRequest('/settings/info', token).get();
};
