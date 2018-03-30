import { methods, SERVER_URL, } from 'src/imports';

class FetchRequest {
  constructor(url, token) {
    this.url = url;
    // this.token = token;
  }

  get = (params, headers) => {
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

  initRequest = (method, params, headers, body) => {
    headers = this.setAuthHeaderIfNeeded(headers);
    return new Request(`${SERVER_URL}${this.url}`, {
      method,
      params,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
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
      debugger;
      throw response;
    }
    return response.json();
  };
}

export default FetchRequest;
