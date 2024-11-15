var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/akun');
var authRouter = require('./routes/auth');
var kamarRouter = require('./routes/kamar');
var dokterRouter = require('./routes/dokter');
var pasienRouter = require('./routes/pasien');
var rawatInapRouter = require('./routes/rawatInap');

var app = express();
var port = process.env.port
app.use(port, () => {
  console.log("API berjalan di : "+port);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/kamar', kamarRouter);
app.use('/dokter', dokterRouter);
app.use('/pasien', pasienRouter);
app.use('/rawatinap', rawatInapRouter);

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
