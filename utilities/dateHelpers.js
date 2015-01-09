'use strict';

var moment = require('moment');

/**
 * Convert Date object to string using format
 * @param {Date} date date to format
 * @param {String} format date format as accepted by moment#format: http://momentjs.com/docs/#/displaying/
 * @returns {String} string representation of date according to format or 'Invalid date'
 */
function toLocalLongDate(date, format) {
    var originalDate = moment(date);

    return originalDate.format(format);
}

/**
 * Convert string to Date object
 * @param {String} stringDate date to convert
 * @param {String} format date format as accepted by moment#format: http://momentjs.com/docs/#/displaying/
 * @returns {Date} new Date object
 */
function fromLocalLongDate(stringDate, format){
    var localDate = moment(stringDate, format);

    return localDate.toDate();
}

module.exports = {
    toLocalLongDate: toLocalLongDate,
    fromLocalLongDate: fromLocalLongDate
};
