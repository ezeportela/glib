const LocalStorage = require('node-localstorage').LocalStorage;
const os = require('os');
const _storage = new LocalStorage(os.tmpdir());
const conversions = require('../utils/conversions');

const storage = (collection) => {
  const createKeyName = (key) => `${collection}_${key}`;

  const setItem = (key, content) =>
    _storage.setItem(
      createKeyName(key), conversions.stringifyJSON(content),
    );

  const getItem = (key) => {
    const item = conversions.parseJSON(_storage.getItem(createKeyName(key)));

    if (!item) return null;

    return item;
  };

  const removeItem = (key, exact = false) =>
    _storage.removeItem(exact ? key : createKeyName(key));

  const countKeys = () => _storage.length;

  const getKey = (index) => _storage.key(index);

  const clear = () => {
    for (let i = 0; i < countKeys(); i++) {
      const key = getKey(i);

      const pattern = RegExp(`${collection}_.*`, 'g');
      if (key.match(pattern)) {
        removeItem(key, true);
      }
    }
  };

  const functions = {
    setItem,
    getItem,
    removeItem,
    clear,
    countKeys,
    getKey,
  };

  return functions;
};

module.exports = storage;
