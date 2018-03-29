import Request from './Request';

export default (avatar, token) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return new Request('/settings/avatar/change', token).put(avatar, {}, headers);
};
