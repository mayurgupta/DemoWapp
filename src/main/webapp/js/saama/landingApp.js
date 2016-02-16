var landingApp = angular.module('landingApp', ['filters']).config(function($routeProvider) {
  'use strict';
  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  }).when('/forgotpassword', {
    templateUrl: 'partials/forgotPassword.html',
    controller: 'forgotPasswordCtrl'
  }).when('/register', {
    templateUrl: 'partials/login.html',
    controller: 'registerCtrl',
    resolve: {
      // 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 100);
        return delay.promise;
      }
    }
  }).otherwise({
    redirectTo: '/login'
  });
}).run(function() {
});

// Login Controller
landingApp.controller('mainCtrl', ['$scope', '$location', function($scope) {
  $scope.hospitalName = "Dignity Health";
  $scope.serviceName = "Sixth SENSE";
  $scope.companyName = "Saama";
}]);
