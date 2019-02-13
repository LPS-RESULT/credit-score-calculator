/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * Localization is a convenient cache of mappings of labels with different languages.
     */
    angular.module("app.util")
        .provider("$localization", [
            function () {
                var config = { //this is initial universal config
                    defaultLocale: "english", //This is the default locale to be loaded
                    localesFolderPath: "locales", //This is where the locales files are stored as .json files
                    supportedLocales: ["english"], //This is the array of supported locales
                    cacheLocally: false, //store fresh copies
                    cacheId: "localization", //id used for localStorage
                    cacheExpiry: 86400000 //how long will the cache be considered valid
                };

                this.$get = ["jsonService", "$localStorage", "$timeout",
                    function (jsonService, $localStorage, $timeout) {
                        var currentLocale = config.defaultLocale; //use default locale at start
                        var locales = {};
                        var storage;
                        if(config.cacheLocally){
                            storage = $localStorage(config.cacheId);
                            locales = (storage.get() || {})
                        }

                        setLocale(currentLocale); //initialize our cache with the default locale

                        function setLocale(locale) {
                            if (!locales[locale]){
                                locales[locale] = {}; //initialize it if it doesn't exist
                                storage.set(locales);
                            }


                            if (locales[locale]._expirationDate //expirationDate was set and;
                                && (new Date().getTime() - locales[locale]._expirationDate) > 0 //it is expired
                                || locales[locale]._expirationDate == undefined) { //OR this is a new locale
                                jsonService.loadTo(config.localesFolderPath, locale, locales[locale], function (data) {
                                    locales[locale]._expirationDate = new Date().getTime() + config.cacheExpiry;
                                    $timeout(function () { currentLocale = locale; }); //switch within $timeout
                                    storage.set(locales);
                                });
                            } else {
                                $timeout(function () { currentLocale = locale; }); //switch within $timeout
                            }
                        }

                        function getSupportedLocales() {
                            return config.supportedLocales;
                        }

                        function getLocale() {
                            return currentLocale;
                        }

                        function getStoredLocales() {
                            return locales;
                        }

                        function localize(name) {
                            if (locales[currentLocale] && locales[currentLocale][name]) {
                                return locales[currentLocale][name];
                            } else {
                                return name;
                            }
                        }

                        return {
                            setLocale: setLocale,
                            getSupportedLocales: getSupportedLocales,
                            getLocale: getLocale,
                            localize: localize,
                            getStoredLocales: getStoredLocales
                        };
                    }
                ];

                this.config = function (k, v) {
                    if (k && v && typeof k == "string") {
                        config[k] = v;
                    } else if (typeof k == "string" && !v) {
                        return config[k];
                    } else if (typeof k == "object" && !v) {
                        config = angular.extend(config, k);
                    } else {
                        throw Error("Unsupported");
                    }
                };
            }
        ])
})(angular);