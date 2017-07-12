const User = require('./model/user');
const Table = require('./model/table')
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// 获取已有账号接口
router.post('/api/checklogin', (req, res) => {
  let md5 = crypto.createHash('md5');
  let password = md5.update(req.body.password).digest('hex');
  //password = md5.update(req.query.password).digest('base64');
  //password = md5.update(req.query.password).digest();
  User.check(req.body.account, password, (err, data) => {
    if (err) {
      res.send('error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
  });
});

router.get('/api/user', (req, res) => {
  User.isExist(req.query.account, (err, data) => {
    if (err) {
      res.send('error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
  })
});

router.post('/api/reg', isUserExist);
router.post('/api/reg', (req, res) => {
  let md5 = crypto.createHash('md5');
  let password = md5.update(req.body.password).digest('hex');
  let user = new User(
    req.body.account,
    password,
    req.body.nameCN,
    req.body.unitName
  );
  user.save((err, data) => {
    if (err) {
      res.send('error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
  });
});

router.get('/api/table', (req, res) => {
  Table.getTable(parseInt(req.query.pageNum), parseInt(req.query.pageSize), (err, data) => {
    if (err) {
      res.send('error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
  })
})

function isUserExist(req, res, next) {
  User.isExist(req.body.account, (err, data) => {
    if (err) {
      res.send('error');
      return;
    }
    if (!!data.IsUser) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      data.IsUser = 0;
      res.end(JSON.stringify(data));
    } else {
      next();
    }
  })
}

module.exports = router;
