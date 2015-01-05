'use strict';

var express = require('express');
var router = express.Router();
var authentication = require('../middleware/authentication');
var antiforgery = require('../middleware/antiforgery');
var applicationModels = require('../view_models/applications');
var applicationManager = require('../data/applicationsManager');

// List applications
router.get('/', authentication.authorized, function (req, res, next) {
    res.redirect('../');
});

// New application
router.get('/new', authentication.authorized, function (req, res) {
    res.render('applications/new', new applicationModels.New(antiforgery.setup(req)));
});

router.post('/new', authentication.authorized, antiforgery.validateToken, function (req, res, next) {
    var application = {},
        valid = true;

    if (req.body) {
        application.author = req.user._id;
        application.position = req.body.position;
        application.description = req.body.description;
        application.company = req.body.company;
        application.refNo = req.body.refNo;
        application.offerUrl = req.body.offerUrl;
        application.companyUrl = req.body.companyUrl;
        application.contacts = req.body.contacts;
        application.offerDate = new Date(req.body.offerDate);
        application.applicationDate = new Date();
        application.notes = req.body.notes;
        application.result = req.body.result;

        applicationManager.create(application, function (err, result) {
            if (err) {
                next(err);
            }
            else {
                res.redirect('/applications');
            }
        });
    }
    else {
        res.locals.errorMessage = 'Invalid application details';
        res.status(400).render('applications/new', new applicationModels.New(antiforgery.setup(req)));
    }

});

module.exports = router;
