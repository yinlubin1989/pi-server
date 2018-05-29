var express = require('express');
var router = express.Router();
const exec = require('child_process').exec

router.all('/pull', function(req, res, next) {  
  console.log('git -C '+ __dirname +' pull')
  exec('git -C '+ __dirname +' pull', (err, stdout) => {
    res.send(stdout);
  });
});

router.all('/restart', function(req, res, next) {
  res.send('正在重启');
  exec('pm2 restart all', (err, stdout) => {});
});

const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

router.all('/led/on', function(req, res, next) {
  led.writeSync(1);
});

router.all('/led/off', function(req, res, next) {
  led.writeSync(0);
});


led.writeSync(1);

setTimeout(() => {
    
})

module.exports = router;
