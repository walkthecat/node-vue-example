// 引入编写好的api
const api = require('./sqlapi'); 
// 引入文件模块
const fs = require('fs');
// 引入日志模块
var logger = require('morgan');
var fileStreamRotator = require('file-stream-rotator')
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const app = express();

var logDirectory = path.join(__dirname, 'logs')

// 建立日志文件格式
var accessLogfile = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
var errorLogfile = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'error-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

//自定义日志格式
logger.token('zdate', function (req, res) {
  return new Date().toLocaleString() || '-';
});
logger.format('J', '[J] :remote-addr - :remote-user [:zdate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')
app.use(logger('dev'));
//增加访问日志
app.use(logger('J', {
  stream: accessLogfile
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
/*app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send('error');
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //增加错误日志
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLogfile.write(meta + err.stack + '\n');

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
});
// 监听8088端口
app.listen(8088);
console.log('success listen 8088...');