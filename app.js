var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');
var admin = require('./routes/admin');
var users = require('./routes/users');

var appKeys = require('./AppKeys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'SMKS8SFMKSMF'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
})

app.use('/', index);
app.use('/login', login);

app.use(function(req, res, next) {
  //if not login
  if (!req.session.user) {
    console.log('REJECT LOGIN');
    res.redirect('/');
  }
  else {
    var permissionPaths = req.session.user.permissions.map(permission => permission.path);
    //if path in permission
    if (permissionPaths.indexOf(req.path) != -1) {
      console.log('ACCEPT');
      next();
    }
    else {
      console.log('REJECT');
      res.redirect('/');
    }
  }
})

//after login
app.use('/admin', admin);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
