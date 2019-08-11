const mysqlOperation = require('../utils/connectDataBase');
const PageIfo = require('../model/PageInfo');

const queryById = function (id, operation, currentPage = 0, pageSize = 10) {
  const pool = mysqlOperation.createPool();
  // mysqlOperation.query(operation, connect, 'name', 'user');
  const pageInfo = new PageIfo(currentPage, pageSize);
  mysqlOperation.query(operation, pool, 'name', 'user', pageInfo, 'id = ' + id);
}

const query = function (operation, currentPage = 0, pageSize = 10) {
  const pool = mysqlOperation.createPool();
  // mysqlOperation.query(operation, connect, 'name', 'user');
  const pageInfo = new PageIfo(currentPage, pageSize);
  mysqlOperation.query(operation, pool, '*', 'user', pageInfo);
}

function show(result) {
  // console.log(result);
  let send = null;
  if (result.length == 1) {
    send = result[0].name
  } else if (result.length > 1) {
    send = result;
  } else {
    send = '没有查到该用户';
  }
  this.res.send(send);
}

const router = function (app) {
  app.get('/api/user', function (req, res) {
    if ('id' in req.query) {
      queryById(req.query.id, show.bind({
        res
      }));
    } else {
      query(show.bind({
        res
      }));
    }
  })
}

module.exports = router;