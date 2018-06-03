var express = require('express');
var router = express.Router();
const exec = require('child_process').exec

var five = require('johnny-five')
var Raspi = require('raspi-io')

var board = new five.Board({
  io: new Raspi,
  repl: false
})

// board.on('ready',function() {
//   const p1 = new five.Pin(21)
//   const p2 = new five.Pin(22)
//   const p3 = new five.Pin(23)
//   const p4 = new five.Pin(24)

//   p1.high()
//   p2.low()  
//   p3.high()
//   p4.low()
// })

router.all('/direction', function(req, res, next) {  
 
});

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

// const Gpio = require('onoff').Gpio;
// const led = new Gpio(17, 'out');

router.all('/led/on', function(req, res, next) {
  // led.writeSync(1);
  // res.send('open');
});

router.all('/led/off', function(req, res, next) {
  // led.writeSync(0);
  // res.send('close');
});

// 
// led.writeSync(1);

setTimeout(() => {
    
})

module.exports = router;
