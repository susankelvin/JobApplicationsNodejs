'use strict';

var SALT_SIZE = 256;
var crypto = require('crypto');
var User = require('../models/User');

/**
 * Register new user with name and password; returns error if username already exists
 * @param {String} username username
 * @param {String} password password
 * @param {Function} callback function(err, user)
 */
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

/**
 * Verify user credentials
 * @param {String} username username
 * @param {String} password password
 * @param {Function} callback function(err, user)
 */
function login(username, password, callback) {
    var passwordHash;

    User.find({username: username}, function (err, user) {
        if (err) {
            callback(err);
        }
        else if (user && user.length === 1) {
            passwordHash = hashPassword(password, user[0].salt);
            if (passwordHash === user[0].passwordHash) {
                callback(null, user[0]);
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

/**
 * Find user by id
 * @param {String} id user's id
 * @param {Function} callback function(err, user)
 */
function findById(id, callback) {
    User.findById(id, callback);
}

/**
 * Find user by username
 * @param {String} username username
 * @param {Function} callback function(err, user)
 */
function findByName(username, callback) {
    User.findOne({username: username}, callback);
}

// Returns password hmac
function hashPassword(password, salt) {
    var passwordHash,
        hmac,
        saltBuffer;

    saltBuffer = new Buffer(salt, 'hex');
    hmac = crypto.createHmac('md5', saltBuffer);
    hmac.update(password);
    passwordHash = hmac.digest('hex');
    return passwordHash;
}

module.exports = {
    register: register,
    login: login,
    findById: findById,
    findByName: findByName
};
