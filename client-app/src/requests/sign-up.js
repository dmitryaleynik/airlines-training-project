import sendRequest from './sendRequest';
import { methods, SERVER_URL, } from 'src/imports';

export default (email, password) => {
  const config = {
    method: methods.POST,
    url: `${SERVER_URL}/sign-up`,
    data: {
      email,
      password,
    },
  };

  return sendRequest(config);
};
