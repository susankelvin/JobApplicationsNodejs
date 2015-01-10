'use strict';

var dateHelpers = require('../utilities/dateHelpers');

function Base(values, dateFormat) {
    values = values || {};
    this._id = values._id;
    this.position = values.position || '';
    this.description = values.description || '';
    this.company = values.company || '';
    this.refNo = values.refNo || '';
    this.offerUrl = values.offerUrl || '';
    this.companyUrl = values.companyUrl || '';
    this.contacts = values.contacts || '';
    this.offerDate = values.offerDate ? dateHelpers.toLocalLongDate(values.offerDate, dateFormat) : '';
    this.notes = values.notes || '';
}

function New(antiforgeryToken, values, dateFormat) {
    Base.call(this, values, dateFormat);
    this.antiforgeryToken = antiforgeryToken || '';
}

New.prototype = Object.create(Base.prototype);
New.prototype.constructor = New;

function Index(applications, activePage, pageCount, dateFormat) {
    this.applications = applications.map(function (item) {
        return new Details(item, dateFormat);
    });
    this.pageCount = pageCount;
    this.activePage = activePage;
}

function Details(values, dateFormat) {
    Base.call(this, values, dateFormat);
    this.applicationDate =
        values.applicationDate ? dateHelpers.toLocalLongDate(values.applicationDate, dateFormat) : '';
    this.result = values.result;
}

Details.prototype = Object.create(Base.prototype);
Details.prototype.constructor = Details;

module.exports = {
    New: New,
    Index: Index,
    Details: Details
};
