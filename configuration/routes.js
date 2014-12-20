'use strict';

function config(app){
    var path = require('path');
    var routes = require('../routes/index');
    var users = require('../routes/users');
    var express = require('express');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(express.static(path.join(path.dirname(__dirname), 'public')));
    app.use('/', routes);
    app.use('/users', users);
}

module.exports = {
    config: config
};
