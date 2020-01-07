const StorageService = require('../../lib/storage.service');

const createConnection = (connection) => {
  const _storage = new StorageService('mysql');

  return {
    query: async (sql, params, callback) => {
      try {
        let result = params.length > 0 ? params[1] : sql;

        if (params[0] == 'set') _storage.setItem(params[1], params[2]);

        if (params[0] == 'get') result = _storage.getItem(params[1]);

        callback(null, result);
      } catch (err) {
        callback(err);
      }
    },

    end: (callback) => callback(null, true),
  };
};

module.exports = {createConnection};
