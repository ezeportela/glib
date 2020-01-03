const {storage} = require('../../lib');

const createConnection = (connection) => {
  const _storage = storage('mysql');

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
