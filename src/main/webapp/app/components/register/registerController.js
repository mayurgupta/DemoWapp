/**
 * Created by Laxmi on 3/14/2016.
 */
truckTransApp.controller('RegisterController', ['$scope', 'RegisterService','$rootScope', function ($scope, RegisterService,$rootScope) {
    $scope.init = function () {

    };
$scope.user={
		role:0
};
$scope.validatePassword=function(user){
	if(user.password!==user.confirmPassword){
		user.confirmPassword="";
		alert("Please enter same password");
	}
}
    $scope.addUser = function (userDetails) {
    	 $("#registerUser").modal("hide");
        var itemToSave = {};
        itemToSave.name = userDetails.name;
        itemToSave.password = userDetails.password;
        itemToSave.confirmPassword = userDetails.confirmPassword;
        itemToSave.role = [1,2];
        itemToSave.email = userDetails.email;
       // itemToSave.address=userDetails.address;
       // itemToSave.pwdChanged=false;

        RegisterService.addUser(itemToSave).then(function (response) {
            if(response){
            	hideProcessDialog();
            	$scope.user=itemToSave.name;
            	 $rootScope.token = "C";
            	$("#successModal").modal("show");
            }
        })
    };


    $scope.init();

}]);