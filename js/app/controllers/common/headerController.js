/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * Controller for header features
     */
    angular.module("app")
        .controller("headerController", ["$scope","$localization",
            function ($scope,$localization) {
                //get the supported locales based on config
                var locales = $localization.getSupportedLocales();

                //retrieve the next available language in the cycle
                $scope.nextLanguage = function(){
                    var index = locales.indexOf($scope.getActiveLanguage())
                    return locales[(index+1) % locales.length];
                };

                //switch to the next language, sets the localization service and updates labels
                $scope.switchLanguage = function(){
                    $localization.setLocale($scope.nextLanguage());
                };

                //retrieves the currently selected language
                $scope.getActiveLanguage = function(){
                    return $localization.getLocale();
                };
            }
        ]);
})(angular);