const client = require('./setup');

module.exports = class Request {
  constructor(queryText, ...values) {
    this.queryText = queryText;
    this.values = values;
  }

  send() {
    return client.query(this.queryText, this.values);
  }
};
