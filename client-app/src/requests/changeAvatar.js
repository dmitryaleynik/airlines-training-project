import Request from './Request';

export default (body, token) => {
  return new Request('/settings/avatar/change', token).put(body);
};
