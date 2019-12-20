const LocalStorage = require('node-localstorage').LocalStorage;
const os = require('os');
const storage = new LocalStorage(os.tmpdir());
const conversions = require('../utils/conversions');
const moment = require('moment');

const cache = (collection) => {
  const createKeyName = (key) => `${collection}_${key}`;

  const setItem = (key, content, expiration) => {
    storage.setItem(createKeyName(key), conversions.stringifyJSON({
      content,
      expires: moment().add(...expiration),
    }));
  };

  const getItem = (key) => {
    const item = conversions.parseJSON(storage.getItem(createKeyName(key)));

    if (!item) return null;

    if (moment() > moment(item.expires)) {
      removeItem(key);
      return null;
    }

    return item.content;
  };

  const removeItem = (key, exact = false) =>
    storage.removeItem(exact ? key : createKeyName(key));

  const clear = () => {
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);

      const pattern = RegExp(`${collection}_.*`, 'g');
      if (key.match(pattern)) {
        removeItem(key, true);
      }
    }
  };

  const fn = {
    setItem,
    getItem,
    removeItem,
    clear,
  };

  return fn;
};

module.exports = cache;
