'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var userManager = require('../data/userManager');

/* GET users listing. */
//router.get('/', function (req, res) {
//    res.send('respond with a resource');
//});

// Register
router.get('/register', function (req, res) {
    res.render('users/register', {title: 'Register'});
});

router.post('/register', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    userManager.register(username, password, function (err, user) {
        if (err) {
            res.redirect('/users/register');
        }
        else if (user) {
            res.redirect('/');
        }
        else {
            res.redirect('/users/register');
        }
    });
});

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
