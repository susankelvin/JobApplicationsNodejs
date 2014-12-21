'use strict';

var express = require('express');
var router = express.Router();
var userManager = require('../data/userManager');

/* GET users listing. */
//router.get('/', function (req, res) {
//    res.send('respond with a resource');
//});

router.get('/register', function (req, res) {
    res.render('users/register');
});

router.post('/register', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    userManager.register(username, password, function(err, user){
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

module.exports = router;
