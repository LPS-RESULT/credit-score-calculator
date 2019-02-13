/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * This filter uses localize to map the label to its correct
     * localized text
     */
    angular.module("app")
        .filter("localizationFilter", ["$localization",
            function ($localization) {
                return function (input) {
                    return $localization.localize(input);
                }
            }
        ]);
})(angular);