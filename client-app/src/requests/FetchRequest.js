import { methods, SERVER_URL, } from 'src/imports';

class FetchRequest {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  get = async (params, headers) => {
    const request = this.initRequest(methods.GET, params, headers);
    return this.fetchJSON(request);
  };

  post = (body, params, headers) => {
    const request = this.initRequest(methods.POST, params, headers, body);
    return this.fetchJSON(request);
  };

  put = (body, params, headers) => {
    const request = this.initRequest(methods.PUT, params, headers, body);
    return this.fetchJSON(request);
  };

  delete = (body, params, headers) => {
    const request = this.initRequest(methods.DELETE, params, headers, body);
    return this.fetchJSON(request);
  };

  initRequest = (method, params, headers, body) => {
    this.prepareUrl(params);
    headers = this.setAuthHeaderIfNeeded(headers);
    return new Request(this.url, {
      method,
      params,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  prepareUrl = (params) => {
    if (!params) {
      return (this.url = `${SERVER_URL}${this.url}`);
    }
    const paramsEntries = Object.entries(params);
    const reducer = (prev, cur, i) => {
      if (i) {
        prev = `${prev}&`;
      }
      return `${prev}${cur[0]}=${cur[1]}`;
    };
    this.url = paramsEntries.reduce(reducer, `${SERVER_URL}${this.url}?`);
    return;
  };

  setAuthHeaderIfNeeded = (headers) => {
    return this.token
      ? {
          ...headers,
          Authorization: `Bearer ${this.token}`,
        }
      : headers;
  };

  fetchJSON = async (request) => {
    const response = await fetch(request);
    if (!response.ok) {
      return response;
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return {
        ...(await response.json()),
        ok: true,
      };
    }
    return {
      ...(await response.text()),
      ok: true,
    };
  };
}

export default FetchRequest;
