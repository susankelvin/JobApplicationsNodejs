'use strict';

var TOKEN_NAME = '_RequestValidationToken';
var uuid = require('node-uuid');

function generateToken() {
    return uuid.v4();
}

/**
 * Express middleware that verifies presence and correctness of antiforgery token.
 * If validation fails it renders errors/400.
 */
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

function setSessionToken(req, token) {
    req.session[TOKEN_NAME] = token;
}

/**
 * Generates new antiforgery token and saves it to request session
 * @param {Object} req Node request
 * @returns {String} Antiforgery token
 */
function setup(req) {
    var antiforgeryToken = generateToken();
    setSessionToken(req, antiforgeryToken);
    return antiforgeryToken;
}

module.exports = {
    generateToken: generateToken,
    validateToken: validateToken,
    setSessionToken: setSessionToken,
    setup: setup
};
