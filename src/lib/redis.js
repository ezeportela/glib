const Redis = require('ioredis');
const {parseJSON} = require('../utils/conversions');
const _ = require('lodash');

const newInstance = (connection) => {
  const redis = new Redis(connection);

  const functions = {
    getItem: async (key, format = 'plain') => {
      const item = await redis.get(key);
      if (_.isEmpty(item)) return null;

      switch (format) {
      case 'plain':
        return item;
      case 'json':
        return parseJSON(item);
      default:
        throw new Error('Invalid format');
      }
    },
  };

  return functions;
};

module.exports = newInstance;
