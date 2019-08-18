const mysqlOperation = require('../utils/connectDataBase');
const PageIfo = require('../model/PageInfo');
const dbResultDeal = require('../utils/dbResultDeal')
const obfuscator = require('../utils/obfuscator')

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

function show(result, isPage) {


  let send = null;
  if (isPage) {
    const dealRes = dbResultDeal(result)
    if (dealRes.data.length > 0) {
      send = dealRes;
    } else {
      send = '没有查寻到数据';
    }
  } else {
    if (result.length > 0) {
      send = result;
    } else {
      send = '没有查寻到数据';
    }
  }
  // console.log(send);
  this.res.send(send);
}

const router = function (app) {
  app.get('/api/user', function (req, res) {
    if ('id' in req.query) {
      queryById(req.query.id, show.bind({
        res
      }));
    } else {
      if ('currentPage' in req.query && 'pageSize' in req.query) {
        query(show.bind({
          res
        }), req.query.currentPage, req.query.pageSize);
      } else {
        query(show.bind({
          res
        }));
      }
    }
  });

  app.get('/api/test', function (req, res) {
    res.send(obfuscator.obfuscationResult.getObfuscatedCode());
  });
}

module.exports = router;