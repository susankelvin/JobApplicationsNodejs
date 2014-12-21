'use strict';

function config(app) {
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var path = require('path');
    var checkAuthenticated = require('../middleware/check-authentication.js');

    // view engine setup
    app.set('views', path.join(path.dirname(__dirname), 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(checkAuthenticated);
}

module.exports = {
    config: config
};
