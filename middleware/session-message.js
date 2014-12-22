'use strict';

function sessionMessage(req, res, next) {
    if (req.session.errorMessage) {
        res.locals.errorMessage = req.session.errorMessage;
        req.session.errorMessage = undefined;
    }

    next();
}

module.exports = sessionMessage;
