const user = require('./model/user');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// 获取已有账号接口
router.get('/api/checklogin', (req, res) => {
  let md5 = crypto.createHash('md5');
  let password = md5.update(req.query.password).digest('hex');
  //password = md5.update(req.query.password).digest('base64');
  //password = md5.update(req.query.password).digest();
  user.check(req.query.account, password, (err, data) => {
    if(err){
        res.send('error');
        return;
    }
    res.send(data);
  });
});

module.exports = router;
