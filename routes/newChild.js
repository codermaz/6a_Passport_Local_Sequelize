let express = require('express');
let router = express.Router();
let passport = require('passport');   // npm i --save passport
let LocalStrategy = require('passport-local').Strategy;  // npm i --save passport-local


// Login über Post der HTML Form
router.post('/', function (req, res, next) {
    var day = 60000 * 60 * 24;   // 60 seconds * 1000 * 60 minutes * 24 hours
    req.session.cookie.expires = new Date(Date.now() + day);
    req.session.cookie.maxAge = day;
    passport.authenticate('local', {
        session: true,
        successRedirect: '/secret', // hier gibt man die Seite ein, die bei Erfolg aufgerufen werden soll
        failureRedirect: '/newChild'  // zurück zum Login!
    })(req, res, next)
});


// get Login Page
router.get('/', function (req, res, next) {
    res.render('newChild');

});

module.exports = router;