const mysqlOperation = require('../utils/connectDataBase');
const PageIfo = require('../model/PageInfo');

const query = function (id, operation) {
  const pool = mysqlOperation.createPool();
  // mysqlOperation.query(operation, connect, 'name', 'user');
  const pageInfo = new PageIfo();
  mysqlOperation.query(operation, pool, 'name', 'user', pageInfo, 'id = ' + id);
}

function show(result) {
  // console.log(result);
  let send = '';
  if (result.length > 0) {
    send = result[0].name
  } else {
    send = '没有查到该用户';
  }
  this.res.send(send);
}

const router = function (app) {
  app.get('/user', function (req, res) {
    const userId = req.query.id;
    query(userId, show.bind({
      res
    }));
  })
}

module.exports = router;