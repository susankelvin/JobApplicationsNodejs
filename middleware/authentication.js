'use strict';

function config(app) {
    app.use(function (req, res, next) {
        res.locals.isAuthenticated = req.user || false;
        next();
    });
}

function authorized(req, res, next) {
    if (res.locals.isAuthenticated) {
        next();
    }
    else {
        res.status(401).render('errors/401', {title: 'Not authorized'});
    }
}

module.exports = {
    config: config,
    authorized: authorized
};
