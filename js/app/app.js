/**
 * Created by Jason Wong on 4/9/2017.
 */

(function (angular) {
    "use strict";

    /**
     * This is the main app module. This will hold all data for the app
     * and all business logic. This will integrate all existing components.
     */
    angular.module('app', [
        'ngRoute',
        'ui.bootstrap',
        'app.util',
        'app.templates',
        'app.api'
    ]);
})(angular);