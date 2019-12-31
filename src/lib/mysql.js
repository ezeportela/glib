const {createConnection} = require('mysql');
const {promisify} = require('util');

const newInstance = async (connection) => {
  const mysql = createConnection(connection);
  const query = await promisify(mysql.query.bind(mysql));
  const end = await promisify(mysql.end.bind(mysql));

  const functions = {
    executeQuery: (sql, params = []) => query(sql, params),

    executeProcedure: (name, params = []) => query(`call ${name}`, params),

    close: () => end(),
  };

  return functions;
};

module.exports = newInstance;
