'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var userManager = require('../data/userManager');

// Register
router.get('/register', function (req, res) {
    res.render('users/register', getRegisterModel());
});

router.post('/register', function (req, res, next) {
    var username = '',
        password = '',
        confirmPassword = '',
        valid = true;

    if (req.body) {
        username = req.body.username;
        password = req.body.password;
        confirmPassword = req.body['confirm-password'];
    }

    if ((!username) || (username.length < 4) || (username.length > 20)) {
        valid = false;
        res.locals.errorMessage = 'Invalid username';
    }
    else if ((!password) || (password.length < 4) || (password.length > 20)) {
        valid = false;
        res.locals.errorMessage = 'Invalid password';
    }
    else if (password !== confirmPassword) {
        valid = false;
        res.locals.errorMessage = 'Passwords do not match.';
    }

    if (!valid) {
        return res.status(400).render('users/register', getRegisterModel(username));
    }

    userManager.findByName(username, function (err, user) {
        if (err) {
            next(err);
        }
        else if (user) {
            res.locals.errorMessage = 'Username is already taken.';
            res.status(400).render('users/register', getRegisterModel(username));
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
                    res.status(400).redirect('/users/register', getRegisterModel(username));
                }
            });
        }
    });
});

function getRegisterModel(username) {
    return {
        title: 'Register',
        username: username || ''
    };
}

// Login
router.get('/login', function (req, res) {
    res.render('users/login', {title: 'Login'});
});

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login'}));

// Logout
router.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
