const Redis = require('ioredis');
const {parseJSON} = require('../utils/conversions');
const _ = require('lodash');

const getValue = (key, connection) => {
  const redis = new Redis(connection);
  return redis.get(key);
};

const getValueJSON = async (key, connection) => {
  const result = await getValue(key, connection);
  if (_.isEmpty(result)) return null;
  return parseJSON(result);
};

module.exports = {
  getValue,
  getValueJSON,
};
