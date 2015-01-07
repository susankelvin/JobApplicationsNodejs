'use strict';

function Base(title, values) {
    this.title = title || '';
    values = values || {};
    this.position = values.position || '';
    this.description = values.description || '';
    this.company = values.company || '';
    this.refNo = values.refNo || '';
    this.offerUrl = values.offerUrl || '';
    this.companyUrl = values.companyUrl || '';
    this.contacts = values.contacts || '';
    this.offerDate = values.offerDate || '';
    this.notes = values.notes || '';
}

function New(antiforgeryToken, values) {
    Base.call(this, 'New', values);
    this.antiforgeryToken = antiforgeryToken || '';
}

New.prototype = Object.create(Base.prototype);
New.prototype.constructor = New;

function Index(applications, activePage, pageCount) {
    this.title = 'History';
    this.applications = applications;
    this.pageCount = pageCount;
    this.activePage = activePage;
}

function Details(values) {
    Base.call(this, 'Details', values);
    this.applicationDate = values.applicationDate;
    this.result = values.result;
}

Details.prototype = Object.create(Base.prototype);
Details.prototype.constructor = Details;

module.exports = {
    New: New,
    Index: Index,
    Details: Details
};
