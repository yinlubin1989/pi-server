var five = require('johnny-five')
var Raspi = require('raspi-io')

var board = new five.Board({
  io: new Raspi,
  repl: false
})

board.on('ready',function() {
  const p1 = new five.Pin(21)
  const p2 = new five.Pin(22)
  const p3 = new five.Pin(23)
  const p4 = new five.Pin(24)

  p1.high()
  p2.low()  
  p3.low()
  p4.high()
  setTimeout(() => {
    p1.low()
    p2.low()  
    p3.low()
    p4.low()
  }, 20000)
})
