import sendRequest from './sendRequest';
import { methods, BASE_URL, } from 'src/imports';

export default (email, password) => {
  const config = {
    method: methods.POST,
    url: `${BASE_URL}/sign-in`,
    data: {
      email,
      password,
    },
  };

  return sendRequest(config);
};
