'use strict';

var PAGE_SIZE = 2;
var express = require('express');
var router = express.Router();
var authentication = require('../middleware/authentication');
var antiforgery = require('../middleware/antiforgery');
var applicationModels = require('../view_models/applications');
var applicationManager = require('../data/applicationsManager');
var locale = require('locale');
var moment = require('moment');

// List applications
router.get('/', authentication.authorized, function (req, res, next) {
    var languageList = new locale.Locales(req.get('Accept-Language')),
        language = languageList[0] ? languageList[0].normalized : 'en',
        date;

    filterApplications(req.user.id, '', 0, PAGE_SIZE, function (err, result) {
        if (err) {
            next(err);
        }
        else {
            for (var i = 0; i < result.applications.length; i++) {
                date = moment(result.applications[i].applicationDate);
                date.locale(language);
                result.applications[i].applicationDate = date.format('LL');
            }

            res.render('applications/index',
                new applicationModels.Index(result.applications, 0, getPageCount(result.count)));
        }
    });
});

// Update applications' table by AJAX get request
router.get('/update', authentication.authorized, function (req, res, next) {
    var start = +req.query.page || 0,
        search = req.query.search || '';

    if (!req.xhr) {
        req.logout();
        res.locals.isAuthenticated = false;
        return res.status(400).render('errors/400', {title: 'Bad request'});
    }

    filterApplications(req.user.id, search, start * PAGE_SIZE, PAGE_SIZE, function (err, result) {
        if (err) {
            res.status(400).end();
        }
        else {
            res.render('applications/_applicationsTable',
                new applicationModels.Index(result.applications, start, getPageCount(result.count)),
                function (err, html) {
                    if (err) {
                        res.status(400).end();
                    }
                    else {
                        res.send(html);
                    }
                });
        }
    });
});

// New application
router.get('/new', authentication.authorized, function (req, res) {
    res.render('applications/new', new applicationModels.New(antiforgery.setup(req)));
});

router.post('/new', authentication.authorized, antiforgery.validateToken, function (req, res, next) {
    var application = {},
        valid = true;

    if (req.body) {
        application.authorId = req.user.id;
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

        applicationManager.add(application, function (err, result) {
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

// Details
router.get('/:id', authentication.authorized, function (req, res, next) {
    var id = req.params.id;
    applicationManager.details(id, function (err, application) {
        if (err) {
            next(err);
        }
        else if (application && (application.authorId === req.user.id)) {
            res.render('applications/details', new applicationModels.Details(application));
        }
        else {
            req.session.errorMessage = 'Invalid application id';
            res.redirect('/applications');
        }
    });
});

// Private functions
function getPageCount(totalCount) {
    var result = (totalCount / PAGE_SIZE) | 0;
    if (totalCount % PAGE_SIZE !== 0) {
        result++;
    }

    return result;
}

function filterApplications(userId, search, start, count, callback) {
    applicationManager.index(userId, search, start, count, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}

module.exports = router;
