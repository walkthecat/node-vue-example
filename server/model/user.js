const db = require('../sqldb');
const sql = require('mssql');

class User {
  constructor(username, password, nameCN, unitName) {
    this.username = username;
    this.password = password;
    this.nameCN = nameCN;
    this.unitName = unitName;
  }

  save(callback) {
    db.connect().then(pool => {
      return pool.request()
        .input('username', sql.NVarChar, this.username)
        .input('password', sql.VarChar, this.password)
        .input('nameCN', sql.NVarChar, this.nameCN)
        .input('unitName', sql.NVarChar, this.unitName)
        .query('insert into Sys_UserInfo(UserName,Password,NameCN,UnitName) values(@username,@password,@nameCN,@unitName)')
    }).then(result => {
      db.close();
      if (result.rowsAffected[0] > 0) {
        callback(null, {
          IsUser: 1
        });
      } else {
        callback(null, {
          IsUser: 0
        });
      }
    }).catch(err => {
      console.log(err);
      db.close();
      callback(err, {
        IsUser: 0
      });
    });
  }

  static isExist(username, callback) {
    db.connect().then(pool => {
      return pool.request()
        .input('username', sql.NVarChar, username)
        .query('select 1 from Sys_UserInfo where UserName=@username')
    }).then(result => {
      db.close();
      if (result.recordset.length > 0) {
        callback(null, {
          IsUser: 1
        });
      } else {
        callback(null, {
          IsUser: 0
        });
      }
    }).catch(err => {
      console.log(err);
      db.close();
      callback(err, {
        IsUser: 0
      });
    });
  }

  static check(username, password, callback) {
    db.connect().then(pool => {
      return pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.VarChar, password)
        .query('select NameCN,UnitName from Sys_UserInfo where UserName=@username and Password=@password')
    }).then(result => {
      db.close();
      if (result.recordset.length > 0) {
        callback(null, {
          IsUser: 1,
          NameCN: result.recordset[0].NameCN,
          UnitName: result.recordset[0].UnitName
        });
      } else {
        callback(null, {
          IsUser: 0
        });
      }

    }).catch(err => {
      console.log(err);
      db.close();
      callback(err, {
        IsUser: 0
      });
    });
  }
}

module.exports = User;
