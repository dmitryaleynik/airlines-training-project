'use strict';

let dbm;
let type;
let seed;
let fs = require('fs');
let path = require('path');
let Promise;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
module.exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

module.exports.up = function(db) {
  const filePath = path.join(
    __dirname,
    'sqls',
    '20180307060520-startup-up.sql'
  );
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8', }, function(err, data) {
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  }).then(function(data) {
    return db.runSql(data);
  });
};

module.exports.down = function(db) {
  const filePath = path.join(
    __dirname,
    'sqls',
    '20180307060520-startup-down.sql'
  );
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8', }, function(err, data) {
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  }).then(function(data) {
    return db.runSql(data);
  });
};

module.exports._meta = {
  version: 1,
};
