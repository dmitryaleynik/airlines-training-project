import axios from 'axios';
import { methods, SERVER_URL, } from 'src/imports';

class Request {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  setAuthHeaderIfNeeded = (headers) => {
    if (this.token) {
      return {
        ...headers,
        Authorization: `Bearer ${this.token}`,
      };
    } else {
      return headers;
    }
  };

  get = () => {
    const config = {
      method: methods.GET,
      url: `${SERVER_URL}${this.url}`,
    };
    config.headers = this.setAuthHeaderIfNeeded(config.headers);

    return axios(config);
  };

  post = (payload) => {
    const config = {
      method: methods.POST,
      url: `${SERVER_URL}${this.url}`,
      data: payload,
    };
    config.headers = this.setAuthHeaderIfNeeded(config.headers);

    return axios(config);
  };
}

export default Request;
