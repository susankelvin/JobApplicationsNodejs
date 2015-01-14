#!/usr/bin/env node
'use strict';

var express = require('express');
var settings = require('./configuration/express');
var routes = require('./configuration/routes.js');
var error = require('./configuration/error.js');
var database = require('./configuration/mongoose');
var environment = require('./configuration/environment');
var app = express();
var configuration = environment[app.get('env')];

// set up application
settings.config(app);
routes.config(app);
error.config(app);
database.config(app, configuration.connectionString);

app.set('port', configuration.port);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
