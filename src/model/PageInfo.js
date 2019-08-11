class PageInfo {
  constructor(currentPage = 0, pageSize = 10) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
module.exports = PageInfo;