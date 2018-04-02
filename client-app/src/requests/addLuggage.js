import FetchRequest from './FetchRequest';

export default (body, token) => {
  console.log(body);
  return new FetchRequest('/booking/luggage', token).put(body);
};
