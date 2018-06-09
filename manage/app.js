var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ws = require('ws');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);

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

new ws.Server({
  port: 12345
}).on('connection', function(socket, req) {

  socket.on('message', data => {
    data.split(',').forEach((item, index) => {
      console.log(item, index)
      pins[index][item == 0 ? 'high' : 'low']();
    })
  })
  socket.on('close', err => {})
  socket.on('error', err => {})
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
