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

  get = (params) => {
    const config = {
      method: methods.GET,
      url: `${SERVER_URL}${this.url}`,
      params,
    };
    config.headers = this.setAuthHeaderIfNeeded(config.headers);

    return axios(config);
  };

  post = (payload, params) => {
    const config = {
      method: methods.POST,
      url: `${SERVER_URL}${this.url}`,
      data: payload,
      params,
    };
    config.headers = this.setAuthHeaderIfNeeded(config.headers);

    return axios(config);
  };

  put = (payload, params, headers) => {
    const config = {
      method: methods.PUT,
      url: `${SERVER_URL}${this.url}`,
      data: payload,
      params,
      headers,
    };
    config.headers = this.setAuthHeaderIfNeeded(config.headers);
    return axios(config);
  };
}

export default Request;
