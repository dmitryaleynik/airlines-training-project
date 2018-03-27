import sendRequest from './sendRequest';
import { methods, SERVER_URL, } from 'src/imports';

export default (token) => {
  const config = {
    method: methods.GET,
    url: `${SERVER_URL}/orders`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return sendRequest(config);
};
