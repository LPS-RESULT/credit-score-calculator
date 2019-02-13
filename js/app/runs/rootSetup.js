/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * Set rootScope functions and listeners on bootstrap
     */
    angular.module("app")
        .run(["$rootScope","$localization",
            function ($rootScope,$localization) {
                /**
                 * Expose a label function for localized labels
                 * @param name
                 * @returns {*}
                 */
                $rootScope.label = function(name){
                    return $localization.localize(name);
                };

                var params = {}; //this is the params container

                /**
                 * Params can be accessed in the template through the rootScope
                 * @param name
                 * @returns {*}
                 */
                $rootScope.param = function(name){
                    return params[name];
                };

                /**
                 * This is the event listener that gets invoked when one of the routes have changed
                 * in such event, reassign the new value of the params object
                 */
                $rootScope.$on('$routeChangeStart', function(evt,current,previous) {
                    params=current.params;
                });
            }
        ]);
})(angular);