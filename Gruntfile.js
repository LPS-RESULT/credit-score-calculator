/**
 * Created by Jason Wong on 4/9/2017.
 */
module.exports = function (grunt) {
    //grunt wrapper function
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt task configuration will go here

        /**
         * Setup karma config for unit tests
         */
        karma: {
            unit: {
                configFile: 'karma.config.js'
            }
        },

        /**
         * Clear up the dist directories, since we will generate new minified files
         */
        clean: {
            js: ['./dist/**', './build/**'], //Clean JS files in here
            css: ['./dist/**'] //Clean CSS files in here
        },

        /**
         * Concatenate all subsidiary files for every module,
         * each module would have ___.all.js file
         */
        concat: {
            options: {
                separator: ';'
            },

            //app-util module
            app_util: {
                src: [
                    './js/app-util/app-util.js',

                    './js/app-util/providers/$localizationProvider.js',
                    './js/app-util/providers/$localStorageProvider.js',

                    './js/app-util/services/jsonService.js',
                    './js/app-util/services/objectService.js'
                ],
                dest: './build/app-util.all.js'
            },

            //app-api module
            app_api: {
                src: [
                    './js/app-api/app-api.js',
                    './js/app-api/providers/$apiProvider.js'
                ],
                dest: './build/app-api.all.js'
            },

            //app app module
            app: {
                src: [
                    './js/app/app.js',

                    './js/app/configs/appConfig.js',
                    './js/app/configs/parcelRuleConfig.js',

                    './js/app/controllers/app/appController.js',
                    './js/app/controllers/common/footerController.js',
                    './js/app/controllers/common/headerController.js',
                    './js/app/factories/parcelFactory.js',
                    './js/app/factories/profileFactory.js',
                    './js/app/filters/localizationFilter.js',
                    './js/app/providers/$categoryProvider.js',
                    './js/app/runs/rootSetup.js',
                    './js/app/services/creditScoreService.js'
                ],
                dest: './build/app.all.js'
            }
        },

        /**
         * Minify all concatenated script files
         */
        uglify: { //minify all items and use(.min.js)
            app_util_js: {src: './build/app-util.all.js', dest: './dist/js/app-util.min.js'},
            app_api_js: {src: './build/app-api.all.js', dest: './dist/js/app-api.min.js'},
            app_js: {src: './build/app.all.js', dest: './dist/js/app.min.js'},
            loader_js: {src: './js/loader.js', dest: './dist/js/loader.min.js'}
        },


        // sass: {
        //     dist: {
        //         options: {
        //             style: "compressed"
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'style',
        //             src: ['**/*.scss'],
        //             dest: './style',
        //             ext: '.min.css'
        //         }]
        //     }
        // },

        /**
         * Combine all CSS files; since they are already minified just concatting them is fine
         */
        cssmin: {
            target: {
                files: {
                    /**
                     *  ALL SOURCES ARE MINIFIED AUTOMATICALLY AND PLACED IN /BUILD folder
                     *  THE DESTINATIONS WILL MOVE IT TO dist DIRECTORY
                     */

                    "./dist/style/common.min.css": [
                        './style/global.css'
                    ]
                }
            }
        },


        copy: {
            main: {
                files: [
                    {src: './js/lib/**', dest: './dist/'},
                    {src: './style/lib/**', dest: './dist/'}
                ]
            }
        },


        //https://www.npmjs.com/package/grunt-angular-templates
        ngtemplates: {
            app: {
                src: '**/**.html',
                cwd: 'html',
                dest: './dist/js/app-templates.min.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: false,
                        removeAttributeQuotes: true,
                        removeComments: false, // Only if you don't use comment directives!
                        removeEmptyAttributes: false,
                        removeRedundantAttributes: false,
                        removeScriptTypeAttributes: false,
                        removeStyleLinkTypeAttributes: false
                    },
                    module: "app.templates",
                    bootstrap: function(module, script) {
                        return '(function(angular){' + //wrap in anonymous function
                            '"use strict";' +
                            '' +
                            //Set the cache
                            'angular.module("app.templates",[]).run(["$templateCache",function($templateCache){' +
                            script +
                            '}])' +
                            '})(angular)';
                    }
                }
            },
            options: {
                prefix: './html/' //need to prefix the template names as ./html/... as if it is in dev
            }
        }
    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-angular-templates');

    //register grunt default task
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'ngtemplates', 'cssmin', 'copy']);
    grunt.registerTask('build', ['clean', 'concat', 'uglify', 'ngtemplates', 'cssmin', 'copy']);
    grunt.registerTask('e2e', 'Run puppeteer test', () => {

    });

}