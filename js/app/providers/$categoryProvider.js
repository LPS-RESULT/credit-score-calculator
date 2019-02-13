/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * Localization is a convenient cache of mappings of labels with different languages.
     */
    angular.module("app")
        .provider("$category", [
            function () {
                var config = {
                    rules: []
                };

                this.$get = [
                    function () {
                        var $category = function(){};
                        /**
                         * Static function of the categorizing service that
                         */
                        $category.categorize = function(parcel){
                            for(var i=0; i<config.rules.length; i++){ //look through the rules
                                if(config.rules[i].acceptFn(parcel)){ //if the rules accept the parcel object
                                    return { //generate a summary
                                        cost: config.rules[i].costFn(parcel),
                                        category: config.rules[i].rule
                                    }
                                }
                            }
                        };
                        return $category;
                    }
                ];

                /**
                 * Adds a rule to the configuration. This function assures that the list of rules are always in order
                 * based on their priorities.
                 * @param priority
                 * @param rule
                 * @param acceptFn
                 * @param costFn
                 */
                this.configRule = function(priority,rule,acceptFn,costFn){
                    config.rules.push({
                        priority: priority,
                        rule: rule,
                        acceptFn: acceptFn,
                        costFn: costFn
                    });
                    config.rules.sort(function(a,b){
                        return a.priority - b.priority;
                    })
                };

                /**
                 * Configure directly the config variable for this provider
                 * @param k
                 * @param v
                 * @returns {*}
                 */
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