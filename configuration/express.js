'use strict';

function config(app) {
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var path = require('path');
    var authentication = require('../middleware/authentication.js');
    var session = require('./session');
    var passport = require('./passport');
    var sessionMessage = require('../middleware/session-message');
    var localization = require('../middleware/localization');

    // view engine setup
    app.set('views', path.join(path.dirname(__dirname), 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    session.config(app);
    passport.config(app);
    authentication.config(app);
    app.use(sessionMessage);
    localization.config(app);
}

module.exports = {
    config: config
};
