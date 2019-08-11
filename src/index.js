const express = require('express');

const router = require('./router/user');
const app = express();
router(app);
const server = app.listen(8080, function (res) {
  console.log();
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})