const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

led.writeSync(1);