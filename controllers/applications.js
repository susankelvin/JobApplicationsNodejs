'use strict';

var PAGE_SIZE = 2;
var express = require('express');
var router = express.Router();
var authentication = require('../middleware/authentication');
var antiforgery = require('../middleware/antiforgery');
var applicationModels = require('../view_models/applications');
var applicationManager = require('../data/applicationsManager');
var dateHelpers = require('../utilities/dateHelpers');

// List applications
router.get('/', authentication.authorized, function (req, res, next) {
    filterApplications(req.user.id, '', 0, PAGE_SIZE, function (err, result) {
        if (err) {
            next(err);
        }
        else {
            res.render('applications/index',
                new applicationModels.Index(result.applications, 0, getPageCount(result.count),
                    res.locals.locale.longDateFormat));
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
        return res.status(400).render('errors/400');
    }

    filterApplications(req.user.id, search, start * PAGE_SIZE, PAGE_SIZE, function (err, result) {
        if (err) {
            res.status(400).end();
        }
        else {
            res.render('applications/_applicationsTable',
                new applicationModels.Index(result.applications, start, getPageCount(result.count),
                    res.locals.locale.longDateFormat),
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
    var application = {};

    application.authorId = req.user.id;
    application.position = req.body.position.trim();
    application.description = req.body.description.trim();
    application.company = req.body.company.trim();

    if (!(application.position && application.description && application.company)) {
        req.session.errorMessage = 'Required information is missing';
        res.redirect('applications/new');
        return;
    }

    if (req.body.offerDate) {
        application.offerDate = dateHelpers.fromLocalLongDate(req.body.offerDate, res.locals.locale.longDateFormat);
        if (!application.offerDate) {
            req.session.errorMessage = 'Invalid offer date';
            res.redirect('applications/new');
            return;
        }
    }

    application.refNo = req.body.refNo;
    application.offerUrl = req.body.offerUrl;
    application.companyUrl = req.body.companyUrl;
    application.contacts = req.body.contacts;
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
});

// Edit
router.get('/edit/:id', authentication.authorized, function (req, res, next) {
    var id = req.params.id;

    applicationManager.details(req.user.id, id, function (err, application) {
        if (err) {
            next(err);
        }
        else if (application) {
            res.render('applications/edit',
                new applicationModels.Edit(antiforgery.setup(req), application, res.locals.locale.longDateFormat));
        }
        else {
            req.session.errorMessage = 'Application not found';
            res.redirect('/applications');
        }
    });
});

router.post('/edit', authentication.authorized, antiforgery.validateToken, function (req, res, next) {
    var application = {};

    if (!req.body._id) {
        req.logout();
        res.locals.isAuthenticated = false;
        return res.status(400).render('errors/400');
    }

    application.position = req.body.position.trim();
    application.description = req.body.description.trim();
    application.company = req.body.company.trim();

    if (!(application.position && application.description && application.company)) {
        req.session.errorMessage = 'Required information is missing';
        return res.redirect('/applications/edit/' + req.body._id);
    }

    if (req.body.applicationDate) {
        application.applicationDate =
            dateHelpers.fromLocalLongDate(req.body.applicationDate, res.locals.locale.longDateFormat);
        if (!application.applicationDate) {
            req.session.errorMessage = 'Invalid application date';
            return res.redirect('/applications/edit/' + req.body._id);
        }
    }

    if (req.body.offerDate) {
        application.offerDate = dateHelpers.fromLocalLongDate(req.body.offerDate, res.locals.locale.longDateFormat);
        if (!application.offerDate) {
            req.session.errorMessage = 'Invalid offer date';
            return res.redirect('/applications/edit/' + req.body._id);
        }
    }

    application.refNo = req.body.refNo;
    application.offerUrl = req.body.offerUrl;
    application.companyUrl = req.body.companyUrl;
    application.contacts = req.body.contacts;
    application.notes = req.body.notes;
    application.result = req.body.result;

    applicationManager.update(req.user.id, req.body._id, application, function (err, result) {
        if (err) {
            next(err);
        }
        else {
            if (!result) {
                req.session.errorMessage = 'Application not found';
            }

            res.redirect('/applications');
        }
    });
});

// Details
router.get('/details/:id', authentication.authorized, function (req, res, next) {
    var id = req.params.id;

    applicationManager.details(req.user.id, id, function (err, application) {
        if (err) {
            next(err);
        }
        else if (application) {
            res.render('applications/details',
                new applicationModels.Details(application, res.locals.locale.longDateFormat));
        }
        else {
            req.session.errorMessage = 'Application not found';
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
