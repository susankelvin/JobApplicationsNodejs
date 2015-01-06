'use strict';

var Application = require('../models/Application');

// callback(err, application)
function add(model, callback) {
    var application = new Application();

    application.authorId = model.authorId;
    application.position = model.position;
    application.description = model.description;
    application.company = model.company;
    application.refNo = model.refNo;
    application.offerUrl = model.offerUrl;
    application.companyUrl = model.companyUrl;
    application.contacts = model.contacts;
    application.offerDate = model.offerDate;
    application.applicationDate = model.applicationDate;
    application.notes = model.notes;
    application.result = model.result;
    application.save(callback);
}

/**
 * Returns applications of the user with userId
 * @param {String} userId user ID as string
 * @param {Number} startIndex starting index
 * @param {Number} count max number of documents to return
 * @param {Function} callback function(err, Object{count, applications})
 */
function index(userId, startIndex, count, callback) {
    var totalCount = 0;
    Application.count({authorId: userId}, function (err, found) {
        if (err) {
            callback(err);
        }
        else {
            totalCount = found;
            Application.find({authorId: userId})
                .skip(startIndex)
                .limit(count)
                .exec(function (err, results) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, {count: totalCount, applications: results});
                    }
                });
        }
    });
}

module.exports = {
    add: add,
    index: index
};
