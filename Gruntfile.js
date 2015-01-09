'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            fonts: {
                nonull: true,
                flatten: true,
                expand: true,
                src: 'bower_components/bootstrap/dist/fonts/*',
                dest: 'public/fonts/'
            },
            javascript: {
                nonull: true,
                flatten: true,
                expand: true,
                src: [
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-validation/dist/jquery.validate.js',
                    'bower_components/jquery-validation/dist/additional-methods.js',
                    'bower_components/jquery-ui/jquery-ui.js',
                    'node_modules/moment/min/moment-with-locales.js'
                ],
                dest: 'public/javascripts/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);
};
