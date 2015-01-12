'use strict';

/**
 * Express middleware that will set res.locals.isAuthenticated to true if there is logged user, false otherwise.
 * @param {Object} app express application
 */
function config(app) {
    app.use(function (req, res, next) {
        res.locals.isAuthenticated = req.user || false;
        next();
    });
}

/**
 * Express middleware that checks for logged user. If no user it renders errors/401.
 */
function authorized(req, res, next) {
    if (res.locals.isAuthenticated) {
        next();
    }
    else {
        res.status(401).render('errors/401');
    }
}

module.exports = {
    config: config,
    authorized: authorized
};
