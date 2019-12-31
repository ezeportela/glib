const mysql = require('./src/lib/mysql');

const fn = async () => {
  try {
    const _mysql = await mysql({
      host: 'localhost',
      port: 33060,
      user: 'root',
      password: 'secret',
      database: 'quiero',
    });
    const result = await _mysql.executeQuery('select * from test', []);
    console.log(result);
    _mysql.close();
  } catch (err) {
    console.error('error', err);
  }
};

fn();
