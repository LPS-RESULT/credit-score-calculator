/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * This utility allows fetching of json files
     */
    angular.module("app.util")
        .service("jsonService", ["$http","$location","objectService","$api",
            function ($http,$location,objectService,$api) {
                var me = this;

                /**
                 * This function loads a JSON file based on a server path and returns a promise
                 * @param path
                 * @returns {HttpPromise}
                 */
                this.loadPath = function(assetPath){
                    var path = $api.baseStaticPath()+assetPath;
                    return $http.get(path);
                };

                /**
                 * This function loads a JSON file given the name and relative folder path from server
                 * It automatically prepends/appends with protocol://host:port/..folderpath../jsonName.json
                 * @param folderPath
                 * @param jsonName
                 */
                this.load = function(folderPath,jsonName){
                    var path = folderPath + "/" + jsonName + ".json";
                    return me.loadPath(path);
                };

                /**
                 * Loads a JSON file then processes the returned JSON
                 * by storing it to an existing cache/object.
                 *
                 * @param folderPath
                 * @param jsonName
                 * @param storage
                 * @param callback
                 */
                this.loadTo=function(folderPath,jsonName,storage,callback){
                    if(storage == null || storage == undefined)
                        throw new TypeError("Target storage cannot be undefined or null")
                    me.load(folderPath,jsonName).then(function(result){
                        objectService.set(storage,result.data);
                        callback.call(null,result.data);
                    });
                };
            }
        ]);
})(angular);