var myApp = angular.module('myApp', ['common', 'commonChart', 'filters', 'highchartDir', 'scrollspyDir', 'ui.bootstrap', "ngResource", 'feedDir', 'notifications'])
    .directive('optionsDisabled', function($parse) {
      var disableOptions = function(scope, attr, element, data, fnDisableIfTrue) {
        $("option[value!='?']", element).each(function(i) {
          var locals = {};
          locals[attr] = data[i];
          $(this).attr("disabled", fnDisableIfTrue(scope, locals));
        });
      };
      return {
        priority: 0,
        require: 'ngModel',
        link: function(scope, iElement, iAttrs) {
          // parse expression and build array of disabled
          // options
          var expElements = iAttrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
          var attrToWatch = expElements[3];
          var fnDisableIfTrue = $parse(expElements[1]);
          scope.$watch(attrToWatch, function(newValue) {
            if (newValue) {
              disableOptions(scope, expElements[2], iElement, newValue, fnDisableIfTrue);
            }
          }, true);
          // handle model updates properly
          scope.$watch(iAttrs.ngModel, function(newValue) {
            var disOptions = $parse(attrToWatch)(scope);
            if (newValue) {
              disableOptions(scope, expElements[2], iElement, disOptions, fnDisableIfTrue);
            }
          });
        }
      };
    });

myApp.directive('validate', function() {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function(scope, element, attrs, cntrl) {
      var regex = new RegExp(attrs.validate);
      function validator(value) {
        cntrl.$setValidity(attrs.name, regex.test(value));
        return value;
      }
      cntrl.$parsers.unshift(validator);
      cntrl.$formatters.unshift(validator);
    }
  };
});
myApp.factory('httpInterceptor', ['$rootScope', '$q', '$injector', 'NotificationService', function(scope, $q, $injector, notifications) {

  function success(response) {
    var $http = $injector.get("$http");
    if ($http.pendingRequests.length < 1) {
      notifications.requestEnded();
    }
    return response;
  }

  function error(response) {
    var $http = $injector.get("$http");
    if ($http.pendingRequests.length < 1) {
      notifications.requestEnded();
    }
    var status = response.status;
    if (status === 401 || status === 404) {
      window.location = "./landingPage.html#/login";
      return;
    } else if (status === 400) {
      notifications.notify("Bad Request : " + response.config.url, "error");
    } else if (status === 404) {
      notifications.notify("Not found : " + response.config.url, "error");
    } else if (status >= 500) {
      notifications.notify("Server Error : " + response.config.url, "error");
    }
    return $q.reject(response);
  }

  return function(promise) {
    notifications.requestStarted();
    return promise.then(success, error);
  };
}]);

myApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

  $routeProvider.when('/', {
    redirectTo: '/socialMedia/socialHealth'
  }).when('/socialMedia', {
    redirectTo: '/socialMedia/socialHealth'
  }).when('/socialMedia/:subtab', {
    templateUrl: 'partials/home.html',
    controller: 'HomePageCtrl',
    activeNav: 'Social Media Sentiments',
    hash: 'socialMedia'
  }).when('/survey', {
    redirectTo: '/survey/hcahpsSummary'
  }).when('/survey/:subtab', {
    templateUrl: 'partials/cmsAnalysis.html',
    controller: 'CmsCtrl',
    activeNav: 'CMS Analysis',
    hash: 'survey'
  }).when('/avatar', {
    redirectTo: '/avatar/avatarHealth'
  }).when('/avatar/:subtab', {
    templateUrl: 'partials/avatarAnalysis.html',
    controller: 'AvatarCtrl',
    activeNav: 'Avatar Analysis',
    hash: 'avatar'
  }).when('/competitiveAnalysis', {
    templateUrl: 'partials/competitiveAnalysis.html',
    controller: 'OtherCtrl',
    activeNav: 'Analysis Areas'
  }).when('/surveyAnalysis', {
    templateUrl: 'partials/surveyAnalysis.html',
    controller: 'OtherCtrl',
    activeNav: 'Analysis Areas'
  }).when('/changePassword', {
    templateUrl: 'partials/changePassword.html',
    controller: 'changePasswordCtrl'
  }).when('/keyInsights', {
    templateUrl: 'partials/keyInsights.html',
    controller: 'KeyInsightCtrl',
    activeNav: 'Key Insights'
  }).when('/keyInsightsExport', {
    templateUrl: 'partials/keyInsightsExport.html',
    controller: 'KeyInsightsExportCtrl',
    activeNav: 'Key Insights'
  }).when('/bestpractices', {
    redirectTo: '/bestpractices/patientexperience'
  }).when('/bestpractices/:subtab', {
    templateUrl: 'partials/bestPractices.html',
    controller: 'bestPracticeCtrl',
    activeNav: 'Best Practices',
    hash: 'bestpractices'
  }).when('/sitemap', {
    templateUrl: 'partials/sitemap.html',
    controller: 'SitemapCtrl',
    activeNav: 'Sitemap'
  }).when('/other', {
    templateUrl: 'partials/404.html',
    controller: 'OtherCtrl',
    activeNav: 'other'
  }).otherwise({
    templateUrl: 'partials/404.html'
  });
  // add responseInterceptors
  $httpProvider.responseInterceptors.push('httpInterceptor');

}]).run(['$rootScope', '$location', 'CommonService', 'CommonChartService', function($rootScope, $location, CommonService, CommonChartService) {
  // Call Services
  $rootScope.common = CommonService;
  $rootScope.commonChart = CommonChartService;

  return $rootScope.$on('$routeChangeStart', function() {
    if (!CommonService.isAuthenticated()) {
      console.log('in Common Service isAuthenticated function');
    }
  });

}]);

// Main Controller
myApp.controller('mainCtrl', ['$scope', '$rootScope', '$location', '$route', 'DashboardService', '$window', '$document',
    function($scope, $rootScope, $location, $route, DashboardService, $window, $document) {
      $scope.$route = $route;
      $rootScope.common.setProperties(function(data) {
        $scope.hospitalName = data.hospitalName;
        $scope.serviceName = data.serviceName;
        $scope.companyName = data.companyName;
      });

      $scope.navType = 'pills';
      $scope.navBarEntity = [{
        "name": "Social Media Sentiments",
        "link": "socialMedia"
      }, {
        "name": "CMS Analysis",
        "link": "survey"
      }, {
        "name": "Avatar Analysis",
        "link": "avatar"
      }, {
        "name": "Key Insights",
        "link": "keyInsights"
      }, {
        "name": "Best Practices",
        "link": "bestpractices"
      }];

      $scope.setSelectedTab = function(tab) {
        $scope.selectedTab = tab;
      };

      $scope.tabClass = function(tab) {
        if ($scope.selectedTab === tab) {
          return "active";
        } else {
          return "";
        }
      };

      $scope.enableForm = true;

      $scope.cluster = [];
      DashboardService.user.get({
        tabName: "config"
      }, function(data) {
        $scope.userDetail = data.userDetail;
        $scope.clusterWithoutDh = data.clusters;
        for (var i = 0; i < data.clusters.length; i++) {
          var h = data.clusters[i].hospitals.push({
            name: "All",
            id: data.clusters[i].id
          });
        }
        data.clusters.push({
          name: "DH Corporate",
          id: 0,
          hospitals: [{
            "name": "All",
            "id": 0
          }]
        });
        $scope.cluster = data.clusters;
        $scope.clusterClone = data.clusters;
        $scope.clusterModel = $scope.cluster[0];
        $rootScope.common.setConfig(data);
      });

      $scope.$on('processOptionsEvent', function(event, flagValue) {
        $scope.processOptions(flagValue);
      });
      $scope.processOptions = function(flagValue) {
        var clusterArray = [];
        for ( var key in $scope.clusterWithoutDh) {
          if ($scope.clusterWithoutDh[key].name !== "DH Corporate") {
            clusterArray.push($scope.clusterWithoutDh[key]);
          }
        }

        switch (flagValue) {
          case "dhDisabled":
            $scope.cluster = [];
            $scope.cluster = clusterArray;
            break;
          case "dhEnabled":
            $scope.cluster = [];
            $scope.cluster = $scope.clusterClone;
            if ($scope.$route.current.params.subtab === "hospitalCms" && $scope.clusterModel.name !== "DH Corporate") {
              var hospArray = [];
              for ( var keyHospital in $scope.hospital) {
                if ($scope.hospital[keyHospital].name !== "All") {
                  hospArray.push($scope.hospital[keyHospital]);
                }
              }
              $scope.hospital = hospArray;
            }
            break;
          case "topicsTabOtherTabsDisabled":
            var clusterArr = [];
            for ( var keyCluster in $scope.clusterClone) {
              if ($scope.clusterClone[keyCluster].name === "DH Corporate") {
                clusterArr.push($scope.clusterClone[keyCluster]);
              }
            }
            $scope.cluster = clusterArr;
            $scope.clusterModel=clusterArr[0];
            break;
          case "otherTabOtherTabsEnabled":
            $scope.cluster = [];
            $scope.cluster = $scope.clusterClone;
            break;
          case "SelectHospital":
            $scope.cluster = $scope.clusterClone;
            $scope.clusterModel = $scope.cluster[clusterIndex];
            $scope.hospitalModel = $scope.hospital[hospitalIndex];
            break;
          case "addAll":
            var addAll = true;
            for ( var keyAll in $scope.hospital) {
              if ($scope.hospital[keyAll].name === "All") {
                addAll = false;
              }
            }
            if (addAll === true) {
              $scope.hospital.push({
                "id": 14,
                "name": "All",
                "isinuse": false
              });
            }
            break;
          default:
            $scope.cluster = [];
            $scope.cluster = $scope.clusterClone;
            $scope.clusterModel = $scope.cluster[0];
            break;
        }
      };

      $scope.$on('tabChange', function() {
        console.log("tabChange");
      });
      $scope.$watch('clusterModel', function() {
        if ($scope.clusterModel) {

          var outerArray = [];

          for (var counter = 0; counter < $scope.clusterModel.hospitals.length; counter++) {
            var tObj = {};
            var tmpObj = $scope.clusterModel.hospitals[counter];
            tObj.id = tmpObj.id;
            tObj.name = tmpObj.name;
            if (tmpObj.status === 0) {
              tObj.isinuse = true;
            } else {
              tObj.isinuse = false;
            }
            outerArray.push(tObj);
          }
          $scope.hospital = outerArray;
          $scope.hospitalModel = outerArray[0];
        }
      });
      $scope.$watch('hospitalModel', function() {
        if ($scope.hospitalModel) {
          var isCluster = false;
          if ($scope.hospitalModel.name === "All") {
            isCluster = true;
          }
          $rootScope.$broadcast("hospitalChange", $scope.hospitalModel, isCluster);

        }
      });

      $scope.logout = function() {
        DashboardService.logout({}, function() {
          var len = window.history.length;
          window.history.go(-len);
          window.location.replace('landingPage.html');
        });
      };

      $scope.disableSelectAll = function() {
        $scope.cluster.forEach(function(c) {
          if (c.hospitals[c.hospitals.length - 1] !== undefined && c.hospitals[c.hospitals.length - 1].name === "All" && c.name !== "DH Corporate") {
            c.hospitals.pop();
          }
        });
      };

      $scope.enableSelectAll = function() {
        $scope.cluster.forEach(function(c) {
          if (c.hospitals[c.hospitals.length - 1] !== undefined && c.hospitals[c.hospitals.length - 1].name !== "All" && c.name !== "DH Corporate") {
            c.hospitals.push({
              name: "All",
              id: c.id
            });
          }
        });
      };

      $scope.enableSelectors = function() {
        $scope.enableForm = true;
      };

      $scope.disableSelectors = function() {
        $scope.enableForm = false;
      };

      $rootScope.commonChart.setChartOption();

      $scope.logoPosModel = true;

      // For Non-sorted Array
      $scope.notSorted = function(obj) {
        if (!obj) { 
          return []; 
        }
        var arr = [];
        for ( var k in obj) {
          if (k !== "$$hashKey") {
            arr.push(k);
          }
        }
        return arr;
      };

      $scope.notSortedTopics = function(obj) {
        if (!obj) { 
            return []; 
        }
        return Object.keys(obj);
      };

      $scope.changePwd = function() {
        $scope.redirectTo = 'index.html#/changePassword';
        window.location.replace($scope.redirectTo);
      };

      $scope.mainScroll = function() {
        $window.onscroll = function() {
          $scope.doScroll($window);
        };
      };

      $scope.doScroll = function($window) {
        var top = $window.pageYOffset || $document[0].documentElement.scrollTop;
        if (top > 20) {
          $scope.logoPosModel = false;
        } else {
          $scope.logoPosModel = true;
        }
        $scope.$apply($scope.logoPosModel);
      };

      $scope.mainScroll();

    }]);
