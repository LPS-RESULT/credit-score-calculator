/**
 * Created by Jason Wong on 4/9/2017.
 */
(function(angular) {
    "use strict";

    /**
     * The main controller for the default app route
     */
    angular.module("app")
        .controller("appController", ["$scope","Parcel","Profile","$category","creditScoreService","$timeout",
            function($scope, Parcel, Profile, $category, creditScoreService,$timeout) {
                $scope.showForms = true;
                $scope.showResults = false;
                $scope.ratingCount = 0;
                $scope.approvalDetails;

                //default parcel value
                $scope.parcel = new Parcel(0,0,0,0);

                $scope.profile = new Profile("","","",0,"",0,"");

                //generates {cost: <number>, category: <name>}
                $scope.summary = $category.categorize($scope.parcel);

                //Executes whenever there are changes to the parcel values
                $scope.onParcelValueChange = function(){
                    $scope.summary = $category.categorize($scope.parcel);
                };


                $scope.submitDetails = function(profile){
                    //TODO Submit to API details
                    // creditScoreService.getCreditSummary(profile);

                    creditScoreService.getCreditSummary(profile)
                        .then(function(response) {
                          console.log(response);
                            $scope.loanApproval = response.data.approval;
                            $scope.creditScore = response.data.creditScore;
                            $scope.creditRating = response.data.creditRating;
                            $scope.approvalDetails = response;
                            $scope.showForms = false;
                            $scope.showResults = true;
                        }, function(response) {
                            $scope.showForms = false;
                            $scope.showResults = true;
                    });
                    $timeout(function(){
                        $scope.count();
                    },500);
                    
                }

                $scope.resetForm = function(person){
                    $scope.profile = ("","","",0,"",0,"");
                    $scope.loanApproval = null;
                    $scope.showForms = true;
                    $scope.showResults = false;
                }

                $scope.getPanelClass = function(){
                    if($scope.loanApproval == 'DENIED'){
                        return 'panel-danger'
                    }else if($scope.loanApproval == 'ACCEPTED'){
                        return 'panel-success';
                    }else{
                        return 'panel-primary';
                    }
                };

                $scope.getButtonClass = function(){
                    if($scope.loanApproval == 'DENIED'){
                        return 'btn-danger'
                    }else if($scope.loanApproval == 'ACCEPTED'){
                        return 'btn-success';
                    }else{
                        return 'btn-primary';
                    }
                };

                $scope.isExpanded = false;
                $scope.expandedPanel = function(){
                    if($scope.isExpanded){
                        return 'panel-expanded';
                    }else{
                        return 'panel-unexpanded';
                    }
                }

                $scope.expandPanel = function(){
                    if($scope.isExpanded){
                       $scope.isExpanded = false; 
                    }else{
                        $scope.isExpanded = true;
                    }
                }

                $scope.count = function () {
                    $('.count').each(function () {
                        $(this).prop('Counter',0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                                $scope.ratingCount = now;
                            }
                        });
                    });
                }

                $scope.displayGauge = function(rating){
                    if($scope.creditScore <= rating){
                         return false;
                    }else{
                        return true;
                    }
                }
            }
        ]);
})(angular);
