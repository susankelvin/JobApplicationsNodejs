'use strict';

var DEFAULT_SORT = '-applicationDate';
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
 * @param {String} search string to be matched case-insensitively in position and company fields
 * @param {Number} startIndex starting index
 * @param {Number} count max number of documents to return
 * @param {Function} callback function(err, Object{count, applications})
 */
function index(userId, search, startIndex, count, callback) {
    var totalCount = 0,
        query,
        pattern;

    query = Application.find({authorId: userId});
    if (search) {
        pattern = new RegExp(search, 'mgi');
        query = query.or([{position: {$regex: pattern}}, {company: {$regex: pattern}}]);
    }

    query.count(function (err, foundCount) {
        if (err) {
            callback(err);
        }
        else {
            totalCount = foundCount;
            query = Application.find({authorId: userId});
            if (search) {
                query = query.or([{position: {$regex: pattern}}, {company: {$regex: pattern}}]);
            }

            query.skip(startIndex)
                .limit(count)
                .sort(DEFAULT_SORT)
                .lean()
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

/**
 * Get application by id
 * @param {String} applicationId application ID as string
 * @param {Function} callback callback(err, application)
 */
function details(applicationId, callback) {
    Application.findById(applicationId)
        .lean()
        .select('-__v')
        .exec(callback);
}

module.exports = {
    add: add,
    index: index,
    details: details
};
