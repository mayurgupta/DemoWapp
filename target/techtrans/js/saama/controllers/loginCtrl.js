// Login Controller
function loginCtrl($scope, $http) {

  $scope.buttonName = "Sign In";
  $scope.text = "Create Account for";
  $scope.link = "#/register";
  $scope.word = /^\w*\.*\w*$/;
  $scope.count = 0;
  $scope.typeValues = {};
  $scope.password = /^\w*\d*\.*\@*\w*\d*$/;
  $scope.invalid = false;
  $scope.loading = false;
  $scope.count = 0;
  $scope.loginEntities = [{
    "icon": "icon-user",
    "type": "text",
    "placeholder": "Username",
    "name": "username",
    "regexValidation": $scope.word
  }, {
    "icon": "icon-key",
    "type": "password",
    "placeholder": "Password",
    "name": "password",
    "regexValidation": $scope.password
  }];

  var self = this;
  self.redirectTo = 'index.html#/';
  self.changePass = 'index.html#/changePassword/';

  self.serialize = function(obj) {
    var str = [];
    for ( var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  };

  self.success = function(data) {
    $scope.invalid = false;
    $scope.loading = false;
    if (data.status === 1) {
      window.location.replace(self.changePass);
    } else {
      window.location.replace(self.redirectTo);

    }
  };

  self.error = function() {
    $scope.invalid = true;
    if ($scope.count === 2) {
      $scope.count = 0;
    } else {
      $scope.count++;
    }
  };

  $scope.mode = "local";
  $scope.forgotpwdpge = function() {
    $scope.redirectTo = 'landingPage.html#/forgotpassword';
    window.location.replace($scope.redirectTo);
  };

  // Submit
  $scope.submit = function() {
	  var sUname = $('#username').val();
	  var sPwd = $('#password').val();
	  if(sUname !=='' && sPwd !=='') {
		  $scope.typeValues.username = sUname;
		  $scope.typeValues.password  = sPwd;
	  }
    var d = self.serialize($scope.typeValues);
    $http({
      url: "api/authenticate",
      method: "POST",
      cache: false,
      data: d,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function(data) {
      self.success(data);
    }).error(function() {
      self.error();
    });
  };
  $scope.closeAlert = function() {
    $scope.invalid = false;
  };
}
loginCtrl.$inject = ['$scope', '$http'];