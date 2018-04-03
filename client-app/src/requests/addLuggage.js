import FetchRequest from './FetchRequest';

export default (body, token) => {
  return new FetchRequest('/booking/luggage', token).put(body);
};
