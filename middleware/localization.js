/**
 * Sets res.locals.locale to Object {
 *  language: first value from 'Accept-Language' header; default is 'en'
 *  longDateFormat: format returned by moment#longDateFormat('LL')
 * }
 * http://momentjs.com/docs/#/i18n/locale-data
 */
'use strict';

var DEFAULT_CULTURE = 'en';
var locale = require('locale');
var moment = require('moment');

function config(app) {
    app.use(localization);
}

function localization(req, res, next){
    var languageList = new locale.Locales(req.get('Accept-Language')),
        language = languageList && languageList[0] ? languageList[0].code : DEFAULT_CULTURE,
        localeData;

    res.locals.locale = {
        language: language
    };
    localeData = moment.localeData(language);
    // Culture not supported
    if (!localeData) {
        localeData = moment.localeData(DEFAULT_CULTURE);
    }

    res.locals.locale.longDateFormat = localeData.longDateFormat('LL');
    next();
}

module.exports = {
    config: config
};
