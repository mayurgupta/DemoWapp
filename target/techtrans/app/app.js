/**
 * Created by Laxmi on 10/3/2015.
 */
var truckTransApp = angular.module('truckTransApp', ['ngRoute']);

truckTransApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'components/home/home.html',
            controller: 'HomeController'
        });
}]);


truckTransApp.controller('headerController',['$scope',function($scope) {
    $scope.openSignUpForm = function () {
              $("#user-sign-up").show();
    };

    $scope.signUp=function(user){
            console.log(user);
    }




}]);