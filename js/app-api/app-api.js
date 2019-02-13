/**
 * Created by Jason Wong on 4/9/2017.
 */

(function (angular) {
    "use strict";

    /**
     * This is the api module. This is where backend meets frontend.
     * $http requests are all handled by this module.
     */
    angular.module('app.api', [
        'app.util'
    ]);
})(angular);