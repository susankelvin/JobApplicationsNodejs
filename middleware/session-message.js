'use strict';

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
