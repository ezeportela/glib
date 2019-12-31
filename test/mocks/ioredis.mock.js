const {storage} = require('../../lib');

class Redis {
  constructor() {
    this.storage = storage('redis');
  }

  async get(key) {
    return this.storage.getItem(key);
  }

  async set(key, value) {
    return this.storage.setItem(key, value);
  }
}

module.exports = Redis;
