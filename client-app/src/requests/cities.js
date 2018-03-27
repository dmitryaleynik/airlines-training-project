import Request from './Request';

export default (token) => {
  return new Request('/cities', token).get();
};
