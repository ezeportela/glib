const storage = require('./storage');
const moment = require('moment');

const cache = (collection) => {
  const _storage = storage(collection);

  const functions = {
    setItem: (key, content, expiration) => {
      _storage.setItem(key, {
        content,
        expires: moment().add(...expiration),
      });
    },

    getItem: (key) => {
      const item = _storage.getItem(key);

      if (!item) return null;

      if (moment() > moment(item.expires)) {
        _storage.removeItem(key);
        return null;
      }

      return item.content;
    },

    removeItem: (key) => _storage.removeItem(key),

    clear: () => _storage.clear(),
  };

  return functions;
};

module.exports = cache;
