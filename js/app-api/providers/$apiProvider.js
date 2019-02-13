/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular,window) {
    "use strict";

    angular.module("app.api")
        .provider("$api", [
            function () {
                var config = {};

                this.$get = ["$http","$location",
                    function ($http,$location) {
                        /**
                         * promise accepts a $http config, and if a callback is passed,
                         * it will run a generic json handler. Otherwise, it return the created
                         * promise as is.
                         *
                         * USAGE 1:
                         * api.promise({
                        *      method: 'POST',
                        *      url: '/api/someEndpoint'
                        *      params: {someUrlParam: "something"}
                        *      data: {someData:"someString"}
                        * });
                         *
                         * This returns a promise, using [then,success,error] can be used to handle the response.
                         *
                         * USAGE 2:
                         * api.promise({
                        *      method: 'POST',
                        *      url: '/api/someEndpoint'
                        *      params: {someUrlParam: "something"}
                        *      data: {someData:"someString"}
                        * },callback);
                         *
                         * This still returns a promise, but the callback will be automatically called.
                         * Upon error, the callback would have an error object, which contains the request config
                         * for reference.
                         *
                         *
                         * @param httpConfig
                         * @param callback
                         * @returns {*}
                         */
                        function promise(httpConfig, callback) {
                            var promise = $http(httpConfig);
                            if (!callback) return promise;
                            promise.success(function (jsonResult) {
                                callback.call(null, jsonResult);
                            }).error(function (err) {
                                callback.call(null, {status: "error", errors: [{message: err, config: httpConfig}]});
                            });
                        }

                        /**
                         * Promise but using api path
                         * @param httpConfig
                         * @param callback
                         * @returns {*}
                         */
                        function apiPromise(httpConfig, callback) {
                            httpConfig.url =  "https://xmld208amc.execute-api.ap-southeast-2.amazonaws.com/v1"
                                + httpConfig.url;
                            return promise(httpConfig,callback);
                        }

                        /**
                         * Returns the base path of the app
                         * @returns {string}
                         */
                        function basePath(){
                            var pathname = window.location.pathname.split("/")[1];
                            var base = window.location.protocol + "//" + window.location.hostname
                                + (window.location.port? (":"+window.location.port):"");
                            return base +"/"+ (pathname.length>0? pathname+"/":"")
                        }

                        /**
                         * Returns the base path of api endpoints
                         * @returns {string}
                         */
                        function baseApiPath(){
                            return basePath() + "api/";
                        }

                        /**
                         * Returns the base path for static assets
                         * @returns {string}
                         */
                        function baseStaticPath(){
                            return basePath();
                        }

                        /**
                         * Generates an endpoint name from a url
                         * @param url
                         * @returns {string}
                         */
                        function getEndpointFromUrl(url){
                            return url.substring(baseApiPath().length);
                        }

                        return {
                            promise: promise,
                            apiPromise: apiPromise,
                            basePath:basePath,
                            baseApiPath: baseApiPath,
                            baseStaticPath: baseStaticPath,
                            getEndpointFromUrl:getEndpointFromUrl
                        }
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
})(angular,window);