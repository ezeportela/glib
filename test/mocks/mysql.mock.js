const {storage} = require('../../lib');

const createConnection = (connection) => {
  const _storage = storage('mysql');

  return {
    query: (sql, params) => {
      if (params[0] == 'set') _storage.setItem(params[1], params[2]);

      if (params[1] == 'get') return _storage.getItem(params[1]);
    },

    end: () => {},
  };
};

module.exports = {createConnection};
