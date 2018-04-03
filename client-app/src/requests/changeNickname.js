import FetchRequest from './FetchRequest';

export default (nickname, token) => {
  return new FetchRequest('/settings/nickname', token).put({ nickname, });
};
