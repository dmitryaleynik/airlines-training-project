const { Client, } = require('pg');

const client = new Client();
client.connect(err => {
  if (!err) {
    logger.info('PostgreSQL is connected!');
  }
});

module.exports = client;
