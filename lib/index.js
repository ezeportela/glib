const redis = require('../src/lib/redis');
const mysql = require('mysql');
const cache = require('../src/lib/cache');
const storage = require('../src/lib/storage');

module.exports = {
  redis,
  mysql,
  cache,
  storage,
};
