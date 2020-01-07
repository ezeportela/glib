const Redis = require('ioredis');
const {parseJSON, stringifyJSON} = require('../utils/conversions');
const _ = require('lodash');

class RedisService {
  constructor(connection) {
    this.instance = new Redis(connection);
  }

  async getItem(key, format = 'plain') {
    const item = await this.instance.get(key);
    if (_.isEmpty(item)) return null;

    switch (format) {
    case 'plain':
      return item;
    case 'json':
      return parseJSON(item);
    default:
      throw new Error('Invalid format');
    }
  }

  setItem(key, content, format = 'plain') {
    let value;
    switch (format) {
    case 'plain':
      value = content;
      break;
    case 'json':
      value = stringifyJSON(content);
      break;
    default:
      throw new Error('Invalid format');
    }

    return this.instance.set(key, value);
  }

  removeItem(key) {
    return this.instance.unlink(key);
  }
}

module.exports = RedisService;
