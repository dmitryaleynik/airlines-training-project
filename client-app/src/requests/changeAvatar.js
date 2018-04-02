import FetchRequest from './FetchRequest';

export default (body, token) => {
  return new FetchRequest('/settings/avatar/change', token).put(body);
};
