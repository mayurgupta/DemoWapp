// Register Controller
myApp.controller('SitemapCtrl', ['$scope','$http', 'CommonService', function($scope, $http) {
  "use strict";
  $scope.enableSelectors();

  $scope.initSitemap = function() {
    $http({
      url: "json/sitemap.json",
      method: "GET",
      cache: false
    }).success(function(data) {
      $scope.data = data;
    }).error(function() {

    });
  };
}]);