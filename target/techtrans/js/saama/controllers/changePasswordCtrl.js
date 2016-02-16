function changePasswordCtrl($scope, $http) {
  $scope.showpwdSamemsg = false;
  $scope.pwdsaveErr = false;
  var self = this;
  $scope.loading = false;
  self.redirectTo = 'login.html#/';
  $scope.errorMessage = "";
  $scope.showsuccessmsg = false;
  $scope.showCancelBtn = false;

  $http({
    url: "api/users/me",
    method: "GET",
    cache: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).success(function(data) {

    if (data.userDetail.pwdChanged) {
      $scope.showCancelBtn = false;
    } else {
      $scope.showCancelBtn = true;
    }

  }).error(function() {

  });

  $scope.submitFrm = function() {if ($scope.currentPwdModel !== undefined && $scope.newPwdModel !== undefined && $scope.confirmPwdModel !== undefined) {
	  /* If old password is equal to new passowrd*/
	  if($scope.currentPwdModel === $scope.newPwdModel) {
    	  $scope.showpwdSamemsg = true;
          $scope.errorMessage = "Sorry old and new passwords are same, please type different password.";
      } else if($scope.newPwdModel !== $scope.confirmPwdModel) {
    	  $scope.showpwdSamemsg = true;
          $scope.errorMessage = "Sorry new password do not match with confirm password, please try again.";
	   } else {
	        $scope.showpwdSamemsg = false;
	        var jsonObj = {};
	        jsonObj.oldPassword = $scope.currentPwdModel;
	        jsonObj.newPassword = $scope.newPwdModel;
	        jsonObj.confirmPassword = $scope.confirmPwdModel;
	        
	        $http({
	            url: "api/users/changePassword",
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

	        self.success = function(data) {
	            if (data.changed) {
	                $scope.showsuccessmsg = true;
	                $scope.successmsg = data.message;
	                setTimeout(function() {
	                    window.location.replace('landingPage.html');
	                }, 2000);
	            } else {
	                $scope.showpwdSamemsg = true;
	                $scope.errorMessage = data.message;
	            }
	        };
	        self.error = function() {
	            $scope.showpwdSamemsg = true;
	            $scope.errorMessage = "Ooops !! Something Went Wrong , Please try again";
	            return false;
	        };
	    }



	}};
  $scope.canelChangePwd = function() {
    $scope.redirectTo = 'index.html#/socialMedia/socialHealth';
    window.location.replace($scope.redirectTo);
  };
  /*  Added code for not accepting the space */
  $("input").on("keydown", function (e) {
            return e.which !== 32;
        });
  /* Ends here*/

}
changePasswordCtrl.$inject = ['$scope', '$http'];