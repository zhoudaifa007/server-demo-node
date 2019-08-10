const mysql = require('mysql');
const dataBaseInfo = require('../config/config');

const connection = mysql.createConnection(dataBaseInfo);

const connectDataBase = function () {
  connection.connect();
  connection.query('SELECT 1 + 1 AS solution', function (error) {
    if (error) throw error;
    console.log('数据库连接成功');
  });
  return connection;
};

const query = function (callback, connection, field, table, where) {
  let sql;
  if (where) {
    sql = `select ${field} from ${table} where ${where}`;
  } else {
    sql = `select ${field} from ${table}`;
  }
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    callback(result);
  });
}

module.exports = {
  connectDataBase,
  query
};