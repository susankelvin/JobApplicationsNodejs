'use strict';

function config(app, connectionString){
    var mongoose = require('mongoose');
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = {
    config: config
};
