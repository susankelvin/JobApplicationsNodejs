'use strict';

var TOKEN_NAME = '_RequestValidationToken';
var uuid = require('node-uuid');

function generateToken() {
    return uuid.v4();
}

function validateToken(req, res, next) {
    var formToken = req.body ? req.body[TOKEN_NAME] : '',
        sessionToken = req.session ? req.session[TOKEN_NAME] : '';
    if ((typeof formToken === 'string') && (typeof sessionToken === 'string') && (formToken !== '') &&
        (formToken === sessionToken)) {
        next();
    }
    else {
        req.logout();
        res.locals.isAuthenticated = false;
        res.status(400).render('errors/400');
    }
}

module.exports = {
    generateToken: generateToken,
    validateToken: validateToken
};
