const {StorageService} = require('../../lib');

class Redis {
  constructor() {
    this.storage = new StorageService('redis');
  }

  async get(key) {
    return this.storage.getItem(key);
  }

  async set(key, value) {
    return this.storage.setItem(key, value);
  }
}

module.exports = Redis;
