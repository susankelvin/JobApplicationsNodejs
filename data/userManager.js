'use strict';

var SALT_SIZE = 256;
var crypto = require('crypto');
var User = require('../models/User');

function register(username, password, callback) {
    var salt,
        passwordHash,
        hmac,
        user;

    salt = crypto.randomBytes(SALT_SIZE).toString('hex');
    hmac = crypto.createHmac('md5', salt);
    hmac.update(password);
    passwordHash = hmac.digest('hex');

    user = new User({
        username: username,
        passwordHash: passwordHash,
        salt: salt
    });
    user.save(callback);
}

module.exports = {
    register: register
};
