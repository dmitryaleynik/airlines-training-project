import Request from './Request';

export default (token) => {
  return new Request('/settings/info', token).get();
};
