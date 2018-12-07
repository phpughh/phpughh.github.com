'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        ghost: {
            test: {
                files: [{
                    src: ['tests/ghost/test_*.js']
                }]
            },
            options: {
                args: {
                    baseUrl: 'http://localhost:4000'
                },
                direct: false,
                logLevel: 'error',
                printCommand: false,
                printFilePaths: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-ghost');

    grunt.registerTask('test', ['ghost']);
    grunt.registerTask('default', ['ghost']);
};
