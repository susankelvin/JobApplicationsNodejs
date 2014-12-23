'use strict';

function isAuthorized(req, res, next){
    if (res.locals.isAuthenticated) {
        next();
    }
    else {
        res.status(401).render('errors/401');
    }
}

module.exports = isAuthorized;
