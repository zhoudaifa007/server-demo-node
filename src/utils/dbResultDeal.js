const dbResultDeal = function (data) {
  let result = {
    data: null,
    total: 0
  };
  result.data = data[0];
  result.total = data[1][0].total
  return result;
};

module.exports = dbResultDeal;