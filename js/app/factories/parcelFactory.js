/**
 * Created by Jason Wong on 4/9/2017.
 */
(function (angular) {
    "use strict";

    /**
     * Parcel is a class with 4 values. It has a getter function for volume.
     */
    angular.module("app")
        .factory("Parcel", [
            function () {
                var Parcel = function(weight,height,width,depth){
                    var me = this;

                    this.weight = weight;
                    this.height = height;
                    this.width = width;
                    this.depth = depth;

                    //Getter function for volume
                    this.getVolume = function(){
                        return me.height * me.width * me.depth;
                    };
                };

                return Parcel;
            }
        ]);
})(angular);