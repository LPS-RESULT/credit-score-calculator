/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * This utility allows fetching of json files
     */
    angular.module("app")
        .service("creditScoreService", ["$http","$location","objectService","$api",
            function ($http,$location,objectService,$api) {
                var me = this;

                /**
                 * Get credit summary for a profile object
                 * @param profile {
                 *     age,
                 *     homeOwnership,
                 *     income
                 * }
                 */
                this.getCreditSummary = function(profile){
                    return $api.apiPromise({
                        method: 'POST',
                        url: '/creditscore',
                        data: profile
                    });
                };
            }
        ]);
})(angular);