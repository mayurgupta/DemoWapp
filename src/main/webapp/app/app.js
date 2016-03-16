/**
 * Created by Laxmi on 10/3/2015.
 */
var truckTransApp = angular.module('truckTransApp', ['ngRoute']);
var Server="http://localhost:8081/techtrans/";
var userLogin=false;

truckTransApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'app/index.html',
            controller: 'mainController'
        });
}]);


truckTransApp.controller('mainController',['$scope',function($scope) {
    $scope.openSignUpForm = function () {
              $("#user-sign-up").show();
    };

    $scope.signUp=function(user){
            console.log(user);
    };

// function to submit the form after all validation has occurred
    $scope.submitForm = function(userData,isValid) {
console.log(userData);
        // check to make sure the form is completely valid
        if (isValid) {
            alert('our form is amazing');
        }

    };


}]);