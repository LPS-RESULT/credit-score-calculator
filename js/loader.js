/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (fallback,window,document) {
    "use strict";

    /**
     * This is the loading script; we load all main libraries that have
     * counterpart CDN, followed by the minified app scripts then lastly all remaining CSS
     */
    fallback.load({
        /**
         * LIB SCRIPTS (First few with CDN file)
         */
        "jQuery":[
            "http://code.jquery.com/jquery-2.2.3.min.js",
            "./dist/js/lib/jquery-2.2.3.min.js"
        ],

        "angular": [
            "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular.min.js",
            "./dist/js/lib/angular.min.js"
        ],

        "angular.module('ngSanitize')": [
            "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-sanitize.min.js",
            "./dist/js/lib/angular-sanitize.min.js"
        ],

        "angular.module('ngRoute')": [
            "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-route.min.js",
            "./dist/js/lib/angular-route.min.js"
        ],

        "angular.module('ui.bootstrap')": [
            "./dist/js/lib/ui-bootstrap.min.js"
        ],

        /**
         * LOAD APP SCRIPTS
         */
        "angular.module('app.util')":[
            "./dist/js/app-util.min.js"
        ],
        "angular.module('app.api')":[
            "./dist/js/app-api.min.js"
        ],
        "angular.module('app.templates')":[
            "./dist/js/app-templates.min.js"
        ],
        "angular.module('app')":[
            "./dist/js/app.min.js"
        ],


        /**
         * LOAD EXTRA CSS
         */
        common_css:["./dist/style/common.min.css"]
    },{
        /**
         * Set dependencies so that they will be retrieved in a particular order
         */
        shim:{
            "jQuery": [],
            "angular": ["jQuery"],
            "angular.module('ngSanitize')":["angular"],
            "angular.module('ngRoute')":["angular"],
            "angular.module('ngMock')":["angular"],
            "angular.module('ui.bootstrap')":["angular"],
            "angular.module('app.util')":["angular"],
            "angular.module('app.api')":["angular"],
            "angular.module('app.templates')":["angular"],
            "angular.module('app')":["angular","angular.module('app.templates')"]
        },

        /**
         * Callback will be called AFTER ALL scripts have been loaded
         * Bootstrap the app with angular.
         *
         * @param success - libs that were loaded
         * @param failed - libs that were not loaded
         */
        callback: function(success,failed){
            function bootstrap(){
                var angular = window["angular"];
                window["angular"].element(function() {
                    angular.bootstrap(document, ['app']);
                });
            }
            console.log("Loaded",success,"Failed",failed);
            if(!failed || Object.keys(failed).length == 0){
                //none failed so it means we can bootstrap right away
                bootstrap();
            }else{
                window.alert("Network Error Occured. Page will reload.");
                window.location.reload();
            }
        }
    })
})(fallback,window,document);