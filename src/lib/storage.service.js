const LocalStorage = require('node-localstorage').LocalStorage;
const os = require('os');
const _storage = new LocalStorage(os.tmpdir());
const conversions = require('../utils/conversions');

class StorageService {
  constructor(collection) {
    this.collection = collection;
  }

  createKeyName(key) {
    return `${this.collection}_${key}`;
  }

  setItem(key, content) {
    return _storage.setItem(
      this.createKeyName(key),
      conversions.stringifyJSON(content),
    );
  }

  getItem(key) {
    const item = conversions.parseJSON(
      _storage.getItem(this.createKeyName(key)),
    );

    if (!item) return null;

    return item;
  }

  removeItem(key, exact = false) {
    return _storage.removeItem(
      exact ? key : this.createKeyName(key),
    );
  }

  countKeys() {
    return _storage.length;
  }

  getKey(index) {
    return _storage.key(index);
  }

  clear() {
    for (let i = 0; i < this.countKeys(); i++) {
      const key = this.getKey(i);

      const pattern = RegExp(`${this.collection}_.*`, 'g');
      if (key.match(pattern)) {
        this.removeItem(key, true);
      }
    }
  }
}

module.exports = StorageService;
