let express = require('express');
let path = require('path');
//let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// passport als Middleware
let passport = require('passport');
let session = require('express-session');  // npm i --save express-session


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('models', path.join(__dirname, 'models'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

let index = require('./routes/index');
let users = require('./routes/users');
let loginChild = require('./routes/loginChild');
let loginParents = require('./routes/loginParents');
let newChild = require('./routes/newChild');
let newParents = require('./routes/newParents');
let newGroup = require('./routes/newGroup');

app.use('/', index);
app.use('/users', users);
app.use('/loginChild', loginChild);
app.use('/loginParents', loginParents);
app.use('/newChild', newChild);
app.use('/newParents', newParents);
app.use('/newGroup', newGroup);

// Cookies erlauben
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'any',
    resave: false,
    saveUninitialized: false
}));

// Passport als Middleware einbringen
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// so kann die App mit node app.js gestartet werden. Der Server läuft ab hier.
var port = 3000;
app.listen(port, function () {
    console.log('app listening on port ' + port);
});

module.exports = app;
