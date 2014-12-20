#!/usr/bin/env node
'use strict';

var debug = require('debug')('JobApplications');
var express = require('express');
var path = require('path');
var middleware = require('./configuration/middleware');
var routes = require('./configuration/routes.js');
var error = require('./configuration/error.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set up middleware
middleware.config(app);
routes.config(app);
error.config(app);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
