(function (angular) {
    "use strict";

    angular.module("app")
        .factory("Profile", [
            function () {
                var Profile = function(firstName, lastName, address, age, gender, income, homeOwnership, loanAmount, type){
                    var me = this;

                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.address = address;
                    this.age = age;
                    this.gender = gender;
                    this.income = income;
                    this.homeOwnership = homeOwnership;
                    this.loanAmount = loanAmount;
                    this.type = type;
                };

                return Profile;
            }
        ]);
})(angular);