'use strict';

var SESSION_SECRET = '47b827af-9b90-4562-9d39-1184ae48948c_JobApplications';
var session = require('express-session');
var MongoStore;
var mongoose;

function config(app) {
    var options = {
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    };

    if (app.get('env') === 'production') {
        MongoStore = require('connect-mongo')(session);
        mongoose = require('mongoose');
        options.store = new MongoStore({mongooseConnection: mongoose.connection});
    }

    app.use(session(options));
}

module.exports = {
    config: config
};
