'use strict';

var USERNAME_MIN_LENGTH = 4;
var USERNAME_MAX_LENGTH = 20;
var USERNAME_PATTERN = /^[\w@%\.]+$/;
var PASSWORD_MIN_LENGTH = 4;
var PASSWORD_MAX_LENGTH = 20;
var PASSWORD_PATTERN = /^\w+$/;
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userManager = require('../data/userManager');
var authentication = require('../middleware/authentication');
var userModels = require('../view_models/users');
var antiforgery = require('../middleware/antiforgery');

// Register
router.get('/register', function (req, res) {
    res.render('users/register', new userModels.Registration('', antiforgery.setup(req)));
});

router.post('/register', antiforgery.validateToken, function (req, res, next) {
    var username = '',
        password = '',
        confirmPassword = '',
        valid = true;

    if (req.body) {
        username = req.body.username;
        password = req.body.password;
        confirmPassword = req.body['confirm-password'];
        if (!usernameValid(username)) {
            valid = false;
            res.locals.errorMessage = 'Invalid username';
        }
        else if (!passwordValid(password)) {
            valid = false;
            res.locals.errorMessage = 'Invalid password';
        }
        else if (password !== confirmPassword) {
            valid = false;
            res.locals.errorMessage = 'Passwords do not match.';
        }
    }
    else {
        valid = false;
        res.locals.errorMessage = 'Invalid registration details';
    }

    if (!valid) {
        return res.status(400).render('users/register', new userModels.Registration(username, antiforgery.setup(req)));
    }

    userManager.findByName(username, function (err, user) {
        if (err) {
            next(err);
        }
        else if (user) {
            res.locals.errorMessage = 'Username is already taken.';
            res.status(400).render('users/register', new userModels.Registration(username, antiforgery.setup(req)));
        }
        else {
            userManager.register(username, password, function (err, user) {
                if (err) {
                    next(err);
                }
                else if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            next(err);
                        }

                        res.redirect('/');
                    });
                }
                else {
                    res.status(400).redirect('/users/register', new userModels.Registration(username, antiforgery.setup(req)));
                }
            });
        }
    });
});

function usernameValid(username) {
    return username && (username.length >= USERNAME_MIN_LENGTH) && (username.length <= USERNAME_MAX_LENGTH) &&
        USERNAME_PATTERN.test(username);
}

function passwordValid(password) {
    return password && (password.length >= PASSWORD_MIN_LENGTH) && (password.length <= PASSWORD_MAX_LENGTH) &&
        PASSWORD_PATTERN.test(password);
}

// Login
router.get('/login', function (req, res) {
    res.render('users/login', new userModels.Login('', antiforgery.setup(req)));
});

router.post('/login', antiforgery.validateToken, function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var username;

        if (err) {
            return next(err);
        }

        if (!user) {
            res.locals.errorMessage = 'Invalid username or password.';
            username = req.body ? req.body.username : '';
            return res.render('users/login', new userModels.Login(username, antiforgery.setup(req)));
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/applications');
        });
    })(req, res, next);
});

// Logout
router.post('/logout', authentication.authorized, function (req, res) {
    req.logout();
    res.redirect('/');
});

// Profile
router.get('/profile', authentication.authorized, function (req, res, next) {
    res.render('users/profile', new userModels.Profile(req.user.username, antiforgery.setup(req)));
});

router.post('/profile', authentication.authorized, antiforgery.validateToken, function (req, res, next) {
        
});

module.exports = router;
