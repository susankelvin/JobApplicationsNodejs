'use strict';

var Application = require('../models/Application');

// callback(err, application)
function create(model, callback) {
    var application = new Application();

    application.author = model.author;
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

module.exports = {
    create: create
};
