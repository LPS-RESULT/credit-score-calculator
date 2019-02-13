/**
 * Created by Jason Wong on 4/9/2017.
 */
(function(angular) {
    "use strict";

    /**
     * This configures the application.
     * Routes - Routing using hashbangs
     * Localization - Settings for localization service
     */
    angular.module("app")
        .config(["$httpProvider", "$locationProvider", "$localizationProvider", "$routeProvider",
            function($httpProvider, $locationProvider, $localizationProvider, $routeProvider) {

                /**
                 * CONFIGURATION FOR LOCALIZATION
                 */
                $localizationProvider.config({
                    defaultLocale: "english", //this is the default selected locale
                    localesFolderPath: "assets/locales", //This is where the locales files are stored as .json files
                    supportedLocales: ["english", "tagalog"], //This is the array of supported locales
                    cacheLocally: true, //cache everything to localstorage
                    localCacheExpiration: 20000 //Expire every 20 seconds (for now)
                });

                /**
                 * CONFIGURATION FOR ROUTES
                 */
                $routeProvider.when("/", {
                    templateUrl: "./html/app/app.html",
                    controller: "appController"
                }).otherwise({ //default to login
                    redirectTo: "/"
                });
            }
        ]);
})(angular);
