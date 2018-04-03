import FetchRequest from './FetchRequest';

export default (body, token) => {
  return new FetchRequest('/booking/temp', token).post(body);
};
