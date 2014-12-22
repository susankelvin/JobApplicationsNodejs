'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userManager = require('../data/userManager');

function config(app) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            userManager.login(username, password, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        userManager.findById(id, done);
    });
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = {
    config: config
};
