'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        username: {type: String, required: true},
        passwordHash: {type: String, required: true},
        salt: {type: String, required: true},
        registeredOn: {type: Date, default: new Date()}
    }
);

var User = mongoose.model('User', userSchema);
module.exports = User;
