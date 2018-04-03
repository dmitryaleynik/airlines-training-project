import FetchRequest from './FetchRequest';

export default (body, token) => {
  return new FetchRequest('/booking/place', token).post(body);
};
