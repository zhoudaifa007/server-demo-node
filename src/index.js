const mysqlOperation = require('./utils/connectDataBase');
const showResult = function (res) {
  console.log(res);
}
const connect = mysqlOperation.connectDataBase();
mysqlOperation.query(showResult, connect, 'name', 'user');
mysqlOperation.query(showResult, connect, 'name', 'user', 'id = 2');
connect.end();