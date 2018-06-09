var express = require('express');
var router = express.Router();
const exec = require('child_process').exec

var five = require('johnny-five')
var Raspi = require('raspi-io')

var board = new five.Board({
  io: new Raspi,
  repl: false
})

let pins = {}
board.on('ready',function() {
  pins = [new five.Pin(21),new five.Pin(22),new five.Pin(23),new five.Pin(24)]
})

router.all('/direction/:cmd', function(req, res, next) {  
  const cmd = req.params.cmd;

  cmd.split(',').forEach((item, index)=>{
    console.log(pins[index])
    pins[index][item ? 'high' : 'low']()
  })
    
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


module.exports = router;
