'use strict';

function config(app){
    var CONNECTION_STRING = 'mongodb://localhost/JobApplications';
    var mongoose = require('mongoose');
    mongoose.connect(CONNECTION_STRING);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = {
    config: config
};
