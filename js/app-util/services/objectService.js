/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * Contains Utilities that fall under Object manipulation
     */
    angular.module("app.util")
        .service("objectService", [
            function () {
                var me = this;
                /**
                 * Copies from a source object and modifies the destination
                 * It does this deeply if the object is a map
                 * @param destObj
                 * @param srcObj
                 * @returns {*}
                 */
                this.from = function from(destObj,srcObj){
                    if(destObj && srcObj){
                        for(var prop in srcObj) {
                            if (destObj[prop] && typeof destObj[prop] == "object") {
                                if(destObj[prop].constructor == Array){ //if its an array
                                    if(destObj[prop].length == srcObj[prop].length){ //check if they have the same lengths
                                        from(destObj[prop], srcObj[prop]);
                                    }else{ //if they don't have the same lengths, probably it should be changed as well
                                        destObj[prop] = srcObj[prop];
                                    }
                                }else{
                                    from(destObj[prop], srcObj[prop]);
                                }
                            } else if(destObj[prop] == undefined || destObj[prop] == null || typeof srcObj[prop]!= "function"){
                                destObj[prop] = srcObj[prop];
                            }
                        }
                    }
                    return destObj;
                };


                /**
                 * Similar to assignment BUT retains object reference
                 *
                 * a = {...}
                 * b = {...}
                 *
                 * set(a,b)
                 *
                 * a != b
                 * JSON.stringify(a) == JSON.stringify(b)
                 *
                 * @param destination
                 * @param source
                 */
                this.set = function(destination,source){
                    for(var a in destination){
                        delete destination[a];
                    }
                    for(var b in source){
                        destination[b] = source[b];
                    }
                    return destination;
                };

                /**
                 * This is very similar to JQuery's extend (NOT by Jason)
                 *
                 * Usage:
                 * fts.extend(true, dest,src) - true for deep copy
                 * fts.extend(dest2,dest1,src) - not deep copy
                 *
                 * @returns {Object}
                 */
                this.extend = function() {
                    // Variables
                    var extended = {};
                    var deep = false;
                    var i = 0;
                    var length = arguments.length;

                    // Check if a deep merge
                    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
                        deep = arguments[0];
                        i++;
                    }

                    // Merge the object into the extended object
                    var merge = function (obj) {
                        for ( var prop in obj ) {
                            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                                // If deep merge and property is an object, merge properties
                                if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                                    extended[prop] = me.extend( true, extended[prop], obj[prop] );
                                } else if(obj[prop]!=null && obj[prop]!=undefined){
                                    extended[prop] = obj[prop];
                                }
                            }
                        }
                    };

                    // Loop through each object and conduct a merge
                    for ( ; i < length; i++ ) {
                        var obj = arguments[i];
                        merge(obj);
                    }
                    return extended;
                };

                /**
                 * Modify is similar to extend but the main difference is that
                 * the first parameter is considered the destination object and will
                 * be modified unlike extend, which creates a new object
                 *
                 * Usage:
                 * fts.mapProperties(objectToChange, changeSet1, changeSet2);
                 * may be similar to deep extending:
                 * object = fts.extend(true,object,changeSet1,changeSet2)
                 *
                 * @returns {T}
                 */
                this.modify = function(){
                    var args = Array.prototype.slice.call(arguments);
                    if(args.length <= 1)
                        throw Error("Modify requires at least two inputs");
                    var dest = args.shift();
                    args.unshift(true); //deep copy
                    var fin = me.extend.apply(null,args);
                    for(var prop in fin){
                        if(!(fin[prop]==undefined || fin[prop]==null))
                            dest[prop] = fin[prop];
                    }
                    return dest;
                };

                /**
                 * Formats the object by running a set of mappers for targeted attributes
                 * mapFormat({a: 1, b: 2.0},{
                 *      a: function(v){ return v * 1.0 }, //turns it to floating point
                 *      b: function(v){ return Math.ceil(v) }, //turns it to integer
                 * })
                 *
                 * @param object
                 * @param mapping
                 */
                this.mapFormat = function(object,mapping){
                    if(angular.isArray(object)){
                        for(var i=0;i<object.length;i++){
                            for(var mapper in mapping){
                                if(object[i][mapper]){
                                    object[i][mapper] = new mapping[mapper](object[i][mapper]);
                                }
                            }
                        }
                    }else{
                        for(var mapper in mapping){
                            if(object[mapper]){
                                object[mapper] = mapping[mapper].call(null,object[mapper])
                            }
                        }
                    }

                };

                /**
                 * Formats the object by running a set of mappers for targeted attributes.
                 * The mappers are constructors of classes, new will be invoked to modify them
                 *
                 * mapClass({a: 1, b: 2.0},{
                 *      a: function(v){ return v * 1.0 }, //turns it to floating point
                 *      b: function(v){ return Math.ceil(v) }, //turns it to integer
                 * })
                 *
                 * @param object
                 * @param mappers
                 */
                this.mapClass = function(object,mapping){
                    for(var mapper in mapping){
                        if(angular.isArray(object[mapper])){
                            for(var i=0;i<object[mapper].length;i++){
                                object[mapper][i] = new mapping[mapper](object[mapper][i]);
                            }
                        }else if(object[mapper]){
                            object[mapper] = new mapping[mapper](object[mapper]);
                        }
                    }
                };

                /**
                 * Converts arguments object to array and filters out
                 * falsy values
                 *
                 * ARGS "xxx", undefined, false, 1, {x:1} = ["xxx",1,{x:1}]
                 * @param arg
                 * @returns {Array.<T>}
                 */
                this.args = function (arg){
                    return ([].slice.call(arg)).filter(Boolean);
                };
            }
        ]);
})(angular);