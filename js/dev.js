/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    //mock the template (since this is available in prod)
    angular.module("app.templates",[]);

    /**
     * ONLY Add in DEV.
     *
     * Expose services on console, for manual, console-based testing.
     */
    angular.module("app")
        .run(["creditScoreService",
            function (creditScoreService) {
                window.creditScoreService = creditScoreService;
            }
        ]);
})(angular);