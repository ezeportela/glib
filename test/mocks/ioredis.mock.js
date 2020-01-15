const StorageService = require('../../lib/storage.service');

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

  async disconnect() {

  }
}

module.exports = Redis;
