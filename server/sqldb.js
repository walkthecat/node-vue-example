const db = require('mssql');
//需打开sql server browser服务 
const config = {
  user: 'sa',
  password: 'sa',
  server: 'localhost\\SQL2008R2', // You can use 'localhost\\instance' to connect to named instance 
  database: 'jbw',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 500
  },
  options: {
    encrypt: false // Use this if you're on Windows Azure 
  }
}

module.exports = new db.ConnectionPool(config);
