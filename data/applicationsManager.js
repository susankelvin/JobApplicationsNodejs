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

// callback(err, applications)
function index(userId, callback) {
    Application.find({authorId: userId}, callback);
}

module.exports = {
    add: add,
    index: index
};
