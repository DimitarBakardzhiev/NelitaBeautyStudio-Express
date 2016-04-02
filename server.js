var express = require('express');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
var env = app.get('env');
var PORT = process.env.PORT || 3000;

var pricelistServices = require('./server/services/pricelistServices');
var contactServices = require('./server/services/contactsServices');

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'voltameklemenoamaxi',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.locals.authenticated = req.isAuthenticated();
    if (res.locals.authenticated) {
        res.locals.isAdmin = req.user.role === 'admin';
    } else {
        res.locals.isAdmin = false;
    }

    next();
});

app.locals.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/auth/login');
};

app.locals.isAdmin = function (req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    }

    res.redirect('/auth/login');
};

// include mongoose
require('./server/config/mongoose')(env);

// include passport
require('./server/config/passport')(passport);

app.get('/', function (req, res) {
    res.render('index');
});

require('./server/controllers/authController')(app, passport);
require('./server/controllers/pricelistController')(app, pricelistServices);
require('./server/controllers/contactsController')(app, contactServices);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(PORT);
console.log('Server running on port ' + PORT);