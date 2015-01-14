'use strict';

module.exports = {
    development: {
        connectionString: 'mongodb://localhost/JobApplications',
        port: 3000
    },
    production: {
        connectionString: 'mongodb://localhost/JobApplications',
        port: 80
    }
};
