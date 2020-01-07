const {createConnection} = require('mysql');
const {promisify} = require('util');

class MySQLService {
  constructor(connection) {
    this.instance = createConnection(connection);
  }

  async executeQuery(sql, params = []) {
    const query = await promisify(this.instance.query.bind(this.instance));
    return query(sql, params);
  }

  executeProcedure(name, params = []) {
    const procedure = `call ${name}(${params.map(() => '?').join(',')})`;
    return this.executeQuery(procedure, params);
  }

  async close() {
    const end = await promisify(this.instance.end.bind(this.instance));
    return end();
  }
}

module.exports = MySQLService;
