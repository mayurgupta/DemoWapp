var notifications = angular.module('notifications', []);

notifications.service('NotificationService', ['$window', '$rootScope', function($window, $rootScope) {
  var alerts = [];
  var _START_REQUEST_ = '_START_REQUEST_';
  var _END_REQUEST_ = '_END_REQUEST_';

  return {
    notify: function(msg, type) {
      if (msg) {
        alerts.push({
          msg: msg,
          type: type || "info"
        });
      }
    },
    removeNotification: function(index) {
      alerts.splice(index, 1);
    },
    getAllNotifications: function() {
      return alerts;
    },
    alert: function(msg) {
      $window.alert(msg);
    },
    confirm: function(msg) {
      return $window.confirm(msg);
    },
    // request notifications
    requestStarted: function() {
      $rootScope.$broadcast(_START_REQUEST_);
    },
    requestEnded: function() {
      $rootScope.$broadcast(_END_REQUEST_);
    },
    onRequestStarted: function($scope, handler) {
      $scope.$on(_START_REQUEST_, function() {
        handler();
      });
    },
    onRequestEnded: function($scope, handler) {
      $scope.$on(_END_REQUEST_, function() {
        handler();
      });
    }
  };
}]);

notifications.directive('loading', ['NotificationService', function(notifications) {
  return {
    restrict: "E",
    link: function($scope, $element) {
      $element[0].style.visibility = "hidden";

      notifications.onRequestStarted($scope, function() {
        $element[0].style.visibility = "visible";
      });

      notifications.onRequestEnded($scope, function() {
        $element[0].style.visibility = "hidden";
      });
    }
  };
}]);

notifications.directive('alerts', ['NotificationService', function(notifications) {
  return {
    restrict: "E",
    template: '<alert ng-repeat="alert in alerts" type="alert.type" close="closeAlert($index)">{{alert.msg}}</alert>',
    link: function() {
      $scope.alerts = notifications.getAllNotifications();
      $scope.closeAlert = function(index) {
        notifications.removeNotification(index);
      };
    }
  };
}]);
