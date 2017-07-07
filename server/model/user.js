const db = require('../sqldb');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static check(username, password, callback) {
    db.connect().then(pool => {
      return pool.query `select 1 from Sys_UserInfo where UserName=${username} and Password=${password}`
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
}

module.exports = User;
