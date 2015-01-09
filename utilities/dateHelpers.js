'use strict';

var moment = require('moment');

/**
 * Converts Date object to string using format specified
 * @param {Date} date date to format
 * @param {String} format date format as accepted by moment#format: http://momentjs.com/docs/#/displaying/
 * @returns {String} string representation of date according to format or 'Invalid date'
 */
function toLocalLongDate(date, format) {
    var originalDate = moment(date);

    return originalDate.format(date, format);
}

/**
 * Convert string to Date object
 * @param stringDate string to convert
 * @param format date format as accepted by moment#format: http://momentjs.com/docs/#/displaying/
 * @returns {Date} new Date object
 */
function fromLocalLongDate(stringDate, format){
    var localDate = moment(stringDate, format);

    return new Date(localDate.utc());
}

module.exports = {
    toLocalLongDate: toLocalLongDate,
    fromLocalLongDate: fromLocalLongDate
};
