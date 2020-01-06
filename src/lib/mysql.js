const {createConnection} = require('mysql');

const newInstance = (connection) => {
  const mysql = createConnection(connection);

  const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      mysql.query(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  };

  const functions = {
    executeQuery,

    executeProcedure(procName, params) {
      return executeQuery(`call ${procName}`, params);
    },

    close() {
      return new Promise((resolve, reject) => {
        mysql.end((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    },
  };

  return functions;
};

module.exports = newInstance;
