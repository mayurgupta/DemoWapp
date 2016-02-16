function registerCtrl($scope, $rootScope) {
  $scope.buttonName = "Register";
  $scope.link = "#/login";
  $scope.text = "Go Back to Login for";
  $scope.typeValues = {};
  $scope.word = /^\s*\w*\s*$/;
  $scope.count = 0;

  $scope.loginEntities = [{
    "icon": "icon-user",
    "type": "text",
    "placeholder": "Username",
    "name": "userid"
  }, {
    "icon": "icon-hospital",
    "type": "text",
    "placeholder": "Hospital",
    "name": "hospitalid"
  }, {
    "icon": "icon-key",
    "type": "password",
    "placeholder": "Password",
    "name": "password"
  }, {
    "icon": "icon-key",
    "type": "password",
    "placeholder": "Re-type Password",
    "name": "repassword"
  }];

  // Submit
  $scope.submit = function() {
    $rootScope.common.login($scope.typeValues.userid, $scope.typeValues.password, function() {
    });
  };
}
registerCtrl.$inject = ['$scope', '$rootScope'];