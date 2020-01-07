const StorageService = require('./storage.service');
const moment = require('moment');

class CacheService {
  constructor(collection) {
    this.instance = new StorageService(collection);
  }

  setItem(key, content, expiration) {
    return this.instance.setItem(key, {
      content,
      expires: moment().add(...expiration),
    });
  }

  getItem(key) {
    const item = this.instance.getItem(key);

    if (!item) return null;

    if (moment() > moment(item.expires)) {
      this.removeItem(key);
      return null;
    }

    return item.content;
  }

  removeItem(key) {
    return this.instance.removeItem(key);
  }

  clear() {
    return this.instance.clear();
  }
}

module.exports = CacheService;
