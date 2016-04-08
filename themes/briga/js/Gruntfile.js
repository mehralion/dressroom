'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jsObfuscate: {
            test: {
                options: {
                    concurrency: 2,
                    keepLinefeeds: false,
                    keepIndentations: false,
                    encodeStrings: true,
                    encodeNumbers: true,
                    moveStrings: true,
                    replaceNames: true,
                    variableExclusions: [ '^_get_', '^_set_', '^_mtd_' ]
                },
                files: {
                    'all.js': [
                        'dress/change.js',
                        'dress/container.js',
                        'dress/dummy.js',
                        'dress/hint.js',
                        'dress/item.js',
                        'dress/items.js',
                        'dress/menu.js',
                        'dress/message.js',
                        'dress/result.js',
                        'dress/selected.js',
                        'dress/selectedRune.js',
                        'dress/start.js',
                        'dress/tabs.js',
                        'dress/vars.js',
                        'dress/windows.js'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('js-obfuscator');
    grunt.registerTask('default', ['jsObfuscate']);
};
