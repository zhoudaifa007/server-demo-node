const mysql = require('mysql');
const PageIfo = require('../model/PageInfo');
const dataBaseInfo = require('../config/config');

function createPool() {
  return mysql.createPool(dataBaseInfo);
}

const query = function (callback, pool, field, table, pageInfo = null, where = null) {

  if (pageInfo.currentPage <= 0 || !pageInfo.currentPage) pageInfo.currentPage = 1;
  var start = (pageInfo.currentPage - 1) * pageInfo.pageSize;
  var end = pageInfo.pageSize || 10;
  let isPage = false;

  let sql;
  if (pageInfo) {
    if (Object.getPrototypeOf(pageInfo) === PageIfo.prototype) {
      if (where) {
        sql = `select ${field} from ${table} where ${where} limit ${start},${end};select FOUND_ROWS() as total;`;
      } else {
        sql = `select ${field} from ${table} limit ${start},${end};SELECT FOUND_ROWS() as total;`;
      }
    } else {
      console.error('"pageInfo" type error');
      return;
    }
    isPage = true;
  } else {
    if (where) {
      sql = `select ${field} from ${table} where ${where}`;
    } else {
      sql = `select ${field} from ${table}`;
    }
  }


  pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query(sql, function (error, res) {
      if (error) {
        console.error('查询失败', error);
      }
      // 使用完毕之后，将该连接释放回连接池
      connection.release();
      callback(res, isPage);
    });
  });
}

module.exports = {
  createPool,
  query
};