#!/usr/bin/env node
'use strict';

var express = require('express');
var settings = require('./configuration/express');
var routes = require('./configuration/routes.js');
var error = require('./configuration/error.js');

var app = express();

// set up application
settings.config(app);
routes.config(app);
error.config(app);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
