/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular,localStorage) {
    "use strict";

    /**
     * $localStorage allows high-level use of a keymap store using localStorage
     * Parsing is handled by the service.
     */
    angular.module("app.util")
        .provider("$localStorage", [
            function () {
                var config = {};

                this.$get = [
                    function () {
                        function Store(name){
                            var me = this;
                            /**
                             * Allows storage to set some data to localStorage
                             * @param data
                             */
                            this.set = function(data){
                                localStorage.setItem(name,JSON.stringify(data));
                            };

                            /**
                             * Retrieves the stored data under this name
                             * @returns {undefined}
                             */
                            this.get = function(){
                                var item = localStorage.getItem(name);
                                if(item) return JSON.parse(item);
                                else return undefined;
                            };
                        }

                        /**
                         * To create a storage instance, simply invoke:
                         * $localStorage("KEY_TO_USE")
                         * @param storeName
                         * @returns {Store}
                         */
                         var $localStorage = function(storeName){
                             return new Store(storeName);
                         };

                         return $localStorage;
                    }
                ];

                this.config = function (k, v) {
                    if (k && v && typeof k == "string") {
                        config[k] = v;
                    } else if (k && typeof k == "string" && !v) {
                        return config[k];
                    } else if (k && typeof k == "object" && !v) {
                        config = angular.extend(config, k);
                    } else {
                        throw Error("Unsupported");
                    }
                }
            }
        ]);
})(angular,window.localStorage);