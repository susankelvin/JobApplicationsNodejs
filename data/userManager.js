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
 * Update user profile; callback will be called with user set to null if user id is not found and false if incorrect password.
 * @param {String} userId user id
 * @param {String} currentPassword current user password
 * @param {String} newPassword new user password
 * @param {Function} callback function(err, user)
 */
function update(userId, currentPassword, newPassword, callback) {
    var currentPasswordHash,
        salt,
        newPasswordHash;

    User.findById(userId, function (err, user) {
        if (err) {
            callback(err);
            return;
        }
        else if (user) {
            currentPasswordHash = hashPassword(currentPassword, user.salt);
            if (currentPasswordHash !== user.passwordHash) {
                callback(null, false);
                return;
            }

            salt = crypto.randomBytes(SALT_SIZE).toString('hex');
            newPasswordHash = hashPassword(newPassword, salt);
            user.salt = salt;
            user.passwordHash = newPasswordHash;
            user.save(callback);
        }
        else {
            callback(null, null);
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
    update: update,
    findById: findById,
    findByName: findByName
};
