'use strict';

var SALT_SIZE = 256;
var crypto = require('crypto');
var User = require('../models/User');

// callback(err, user)
function register(username, password, callback) {
    var salt,
        user,
        passwordHash;

    salt = crypto.randomBytes(SALT_SIZE).toString('hex');
    passwordHash = hashPassword(password, salt);
    user = new User({
        username: username,
        passwordHash: passwordHash,
        salt: salt
    });
    user.save(callback);
}

// callback(err, user)
function login(username, password, callback){
    var user,
        passwordHash;

        user = User.find({username: username}, function(err, user) {
            if (err) {
                callback(err);
            }
            else if (user) {
                passwordHash = hashPassword(password, user.salt);
                if (passwordHash === user.passwordHash) {
                    callback(null, user);
                }
                else {
                    callback(null, false);
                }
            }
            else {
                callback(null, false);
            }
        });
}

// callback(err, user)
function findById(id, callback){
    var user = User.findById(id, callback);
}

// Returns password hmac
function hashPassword(password, salt) {
    var passwordHash,
        hmac;

    hmac = crypto.createHmac('md5', salt);
    hmac.update(password);
    passwordHash = hmac.digest('hex');
    return passwordHash;
}

module.exports = {
    register: register,
    login: login,
    findById: findById
};
