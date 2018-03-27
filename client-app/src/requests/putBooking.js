import Request from './Request';

export default (body, token) => {
  return new Request('/booking/temp', token).put(body);
};
