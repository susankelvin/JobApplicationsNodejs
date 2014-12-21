'use strict';

function checkAuthentication(req, res, next){
    res.locals.isAuthenticated = req.user || false;
    next();
}

module.exports = checkAuthentication;
