import Request from './Request';

export default (nickname, token) => {
  return new Request('/settings/nickname', token).put({ nickname, });
};
