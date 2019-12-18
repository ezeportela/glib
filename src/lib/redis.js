const Redis = require('ioredis');
const {parseJSON} = require('../utils/conversions');
const _ = require('lodash');

const newInstance = (connection) => {
  const redis = new Redis(connection);

  const getValue = (key) => redis.get(key);

  const fn = {
    getValue,

    getValueJSON: async (key) => {
      const result = await getValue(key);
      if (_.isEmpty(result)) return null;
      return parseJSON(result);
    },
  };

  return fn;
};

module.exports = newInstance;
