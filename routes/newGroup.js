let express = require('express');
let router = express.Router();
let passport = require('passport');   // npm i --save passport
let LocalStrategy = require('passport-local').Strategy;  // npm i --save passport-local

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username, password);
        return done(null,true);

/*        connection.query(sqlFindUserWithPassword, [username, password], (err, result) => {
            if (err) {
                return done(err);
            }
            if (result.length !== 0) {
                // User / Pwd  stimmt
                return done(null, true);
            } else {
                // User / Pwd falsch
                return done(null, false);
            }
        });
*/
    }
));

// Login über Post der HTML Form
router.post('/', function (req, res, next) {
    var day = 60000 * 60 * 24;   // 60 seconds * 1000 * 60 minutes * 24 hours
    req.session.cookie.expires = new Date(Date.now() + day);
    req.session.cookie.maxAge = day;
    passport.authenticate('local', {
        session: true,
        successRedirect: '/secret', // hier gibt man die Seite ein, die bei Erfolg aufgerufen werden soll
        failureRedirect: '/newGroup'  // zurück zum Login!
    })(req, res, next)
});


// get Login Page
router.get('/', function (req, res, next) {
    res.render('newGroup');

});

module.exports = router;