var express = require('express');
var router = express.Router();
const exec = require('child_process').exec

router.all('/pull', function(req, res, next) {  
  console.log('git -C '+ process.cwd() +' pull')
  exec('git -C '+ process.cwd() +' pull', (err, stdout) => {
    res.send(stdout);
  });
});

router.all('/restart', function(req, res, next) {
  res.send('正在重启');
  exec('pm2 restart all', (err, stdout) => {});
});

module.exports = router;
