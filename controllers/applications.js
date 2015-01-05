'use strict';

var express = require('express');
var router = express.Router();
var authentication = require('../middleware/authentication');
var antiforgery = require('../middleware/antiforgery');
var applicationModels = require('../view_models/applications');

// List applications
router.get('/', authentication.authorized, function (req, res, next) {
    res.redirect('../');
});

// New application
router.get('/new', authentication.authorized, function (req, res) {
    res.render('applications/new', new applicationModels.New(antiforgery.setup(req)));
});

module.exports = router;
