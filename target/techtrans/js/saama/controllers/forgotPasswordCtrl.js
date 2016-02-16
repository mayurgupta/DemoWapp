/*function forgotPasswordCtrl($scope, $http) {
  var self = this;
  $scope.showsuccessmsg = false;
  $scope.showpwdSamemsg = false;
  self.redirectTo = 'landingPage.html#/login';

  $scope.showsubmitbtn = true;
  $scope.showSubmitLoader = false;

  $scope.submitfrogtpwdFrm = function() {
    if ($scope.fgtpwd_username !== undefined && $scope.fgtpwd_pwd !== undefined) {

      $scope.showsubmitbtn = false;
      $scope.showSubmitLoader = true;

      var jsonObj = {};
      jsonObj.userName = $scope.fgtpwd_username;
      jsonObj.email = $scope.fgtpwd_pwd;

      $http({
        url: "general/helper/forgotPassword",
        method: "POST",
        cache: false,
        data: jsonObj,
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(data) {
        self.success(data);
      }).error(function() {
        self.error();
      });
    }

    self.success = function(data) {
      if (data.changed) {
        $scope.showSubmitLoader = false;
        $scope.showsuccessmsg = true;
        $scope.successmsg = data.message;
        setTimeout(function() {
          window.location.replace(self.redirectTo);
        }, 2000);

      } else {
        $scope.showpwdSamemsg = true;
        $scope.errorMessage = data.message;
      }

    };

    self.error = function() {
      console.log('in errors');
    };

  };
}
forgotPasswordCtrl.$inject = ['$scope', '$http'];*/

function forgotPasswordCtrl($scope, $http) {
  var self = this;
  $scope.showsuccessmsg = false;
  $scope.showpwdSamemsg = false;
  self.redirectTo = 'landingPage.html#/login';

  $scope.showsubmitbtn = true;
  $scope.showSubmitLoader = false;

  $scope.submitfrogtpwdFrm = function() {
    if ($scope.fgtpwd_username !== undefined && $scope.fgtpwd_pwd !== undefined) {

      $scope.showsubmitbtn = false;
      $scope.showSubmitLoader = true;

      var jsonObj = {};
      jsonObj.userName = $scope.fgtpwd_username;
      jsonObj.email = $scope.fgtpwd_pwd;

      $http({
        url: "general/helper/forgotPassword",
        method: "POST",
        cache: false,
        data: jsonObj,
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(data) {
        self.success(data);
      }).error(function() {
        self.error();
      });
    }

    self.success = function(data) {
      if (data.changed) {
        $scope.showSubmitLoader = false;
        $scope.showsuccessmsg = true;
        $scope.successmsg = data.message;
        setTimeout(function() {
          window.location.replace(self.redirectTo);
        }, 2000);

      } else {
        $scope.showSubmitLoader = false;  
        $scope.showpwdSamemsg = true;
        $scope.showsubmitbtn = true;
        $scope.errorMessage = data.message;
      }

    };

    self.error = function() {
      console.log('in errors');
    };

  };
}
forgotPasswordCtrl.$inject = ['$scope', '$http'];