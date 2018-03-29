import Request from './Request';

export default (body, token) => {
  return new Request('/booking/place', token).delete(body);
};
