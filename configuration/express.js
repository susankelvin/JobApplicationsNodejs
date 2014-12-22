'use strict';

function config(app) {
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var path = require('path');
    var checkAuthenticated = require('../middleware/check-authentication.js');
    var session = require('./session');
    var passport = require('./passport');
    var sessionMessage = require('../middleware/session-message');

    // view engine setup
    app.set('views', path.join(path.dirname(__dirname), 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    session.config(app);
    passport.config(app);
    app.use(checkAuthenticated);
    app.use(sessionMessage);
}

module.exports = {
    config: config
};
