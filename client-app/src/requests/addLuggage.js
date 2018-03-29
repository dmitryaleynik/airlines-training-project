import Request from './Request';

export default (body, token) => {
  console.log(body);
  return new Request('/booking/luggage', token).put(body);
};
