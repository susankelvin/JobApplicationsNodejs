'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    authorId: {type: String, ref: 'User', required: true},
    position: {type: String, required: true},
    description: {type: String, required: true},
    company: {type: String, required: true},
    refNo: String,
    offerUrl: String,
    companyUrl: String,
    contacts: String,
    offerDate: Date,
    applicationDate: {type: Date, default: new Date()},
    notes: String,
    result: String
});

var Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
