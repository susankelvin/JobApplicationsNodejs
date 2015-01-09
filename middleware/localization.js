/**
 * Sets res.locals.locale to first value from 'Accept-Language' header; default is 'en'
 * Sets res.locals.longDateFormat to format returned by moment#longDateFormat('LL')
 * http://momentjs.com/docs/#/i18n/locale-data
 */
'use strict';

var locale = require('locale');
var moment = require('moment');

function config(app) {
    app.use(setLocalizationInformation);
}

function setLocalizationInformation(req, res, next){
    var languageList = new locale.Locales(req.get('Accept-Language')),
        language = languageList && languageList[0] ? languageList[0].code : 'en',
        localeData;

    res.locals.locale = language;
    localeData = moment.localeData(language);
    res.locals.longDateFormat = localeData.longDateFormat('LL');
    next();
}

module.exports = {
    config: config
};
