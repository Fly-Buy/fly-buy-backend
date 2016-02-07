
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var dotenv = require('dotenv').load();

var pg = require('pg');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);

var passport = require('./local_modules/passport_config');

var routes = require('./routes/index');
var auth = require('./routes/auth');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';


// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// user session
app.use(session({
  store: new pgSession({
    pg : pg,                                                    // Use global pg-module
    conString : process.env.DEV_DATABASE_URL,        // Connect using something else than default DATABASE_URL env variable
    tableName : 'session'                                      // Use another table-name than the default "session" one
  }),
  saveUninitialized: true,
  secret: process.env.SESS_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));


// user authenication
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
