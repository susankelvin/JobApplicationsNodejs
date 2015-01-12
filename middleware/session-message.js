'use strict';

/**
 * Express middleware that sets res.locals.errorMessage to value found in req.session.errorMessage
 * and removes the last.
 * @param {Object} app express application
 */
function config(app) {
    app.use(sessionMessage);
}

function sessionMessage(req, res, next) {
    if (req.session.errorMessage) {
        res.locals.errorMessage = req.session.errorMessage;
        delete req.session.errorMessage;
    }

    next();
}

module.exports = {
    config: config
};
