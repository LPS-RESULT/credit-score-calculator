/**
 * Created by Jason Wong on 4/9/2017.
 */
(function(angular) {
    "use strict";

    /**
     * This configures the rules for the categorizing service.
     */
    angular.module("app")
        .config(["$categoryProvider",
            function($categoryProvider) {

                /**
                 * Each rule is in the format: <priority>, <rule name>, <accept function>, <cost function>
                 */

                $categoryProvider.configRule(1,"reject",function(parcel){
                    return parcel.weight > 50;
                },function(parcel){
                    return null;
                });

                $categoryProvider.configRule(2,"heavy",function(parcel){
                    return parcel.weight > 10;
                },function(parcel){
                    return 15 * parcel.weight;
                });

                $categoryProvider.configRule(3,"small",function(parcel){
                    return parcel.getVolume() < 1500;
                },function(parcel){
                    return 0.05 * parcel.getVolume();
                });

                $categoryProvider.configRule(3,"medium",function(parcel){
                    return parcel.getVolume() < 2500;
                },function(parcel){
                    return 0.04 * parcel.getVolume();
                });

                $categoryProvider.configRule(5,"large",function(parcel){
                    return true; //accept everything
                },function(parcel){
                    return 0.03 * parcel.getVolume();
                });
            }
        ]);
})(angular);
