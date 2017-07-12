const db = require('../sqldb');
const sql = require('mssql');

class Table {
  constructor(username, nameCN, unitName) {
    this.username = username
    this.nameCN = nameCN
    this.unitName = unitName
  }

  static getTable(pageNum, pageSize, callback) {
    let ret = {}
    let p
    let pageRange = 2
    db.connect().then(pool => {
      let pNum = pageNum * pageSize
      let sqlStr = ''
      if (pNum == pageSize) {
        sqlStr = 'select top ' + pNum.toString() + ' UserName,NameCN,UnitName from Sys_UserInfo order by CreateDate desc'
      } else {
        sqlStr = 'select * from (select top ' + pageNum.toString() + ' * from (select top ' + pNum.toString() + ' UserName,NameCN,UnitName,CreateDate from Sys_UserInfo order by CreateDate DESC) a ORDER BY CreateDate) b ORDER BY CreateDate DESC'
      }
      p = pool
      return pool.request()
        .query(sqlStr)
    }).then(result => {
      ret.rowData = result.recordset
      return p.request()
        .query("SELECT CASE WHEN currentPage=1 THEN 1 ELSE 0 END isFirstPage,CASE WHEN currentPage=totalPage THEN 1 ELSE 0 END isLastPage,* FROM (select " + pageNum.toString() + " currentPage,count(*)/" + pageSize.toString() + "+case when count(*)%" + pageSize.toString() + ">0 then 1 else 0 end totalPage,count(*) totalNum from Sys_UserInfo) a")
    }).then(result => {
      ret.footData = result.recordset[0]
      let totalPage = result.recordset[0].totalPage
      let remainingPage = 0
      let count
      let showNum = []
      for (count = pageNum, remainingPage += pageRange; count > 1 && remainingPage >= 0; count--, remainingPage--) {
        showNum.push(count);
      }
      for (count = pageNum, remainingPage += pageRange; count < totalPage && remainingPage >= 0; count++, remainingPage--) {
        showNum.push(count);
      }
      ret.rangeData = showNum
      callback(null, ret);
      db.close();
    }).catch(err => {
      console.log(err);
      db.close();
      callback(err, {});
    })

    db.on('error', err => {
      console.log(err);
      db.close();
      callback(err, {});
    })
  }
}

module.exports = Table
