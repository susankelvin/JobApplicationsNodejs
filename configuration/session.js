'use strict';

var SESSION_SECRET = '47b827af-9b90-4562-9d39-1184ae48948c_JobApplications';
var session = require('express-session');

function config(app){
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
}

module.exports = {
    config: config
};
