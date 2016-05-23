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
	
		$("#error").html("Password and confirm password should be same.");
		
		return false;
	}else{
		return true;
	}
}
    $scope.addUser = function (userDetails) {
    	
    	if($scope.validatePassword(userDetails)){
    	 $("#registerUser").modal("hide");
        var itemToSave = {};
        itemToSave.name = userDetails.name;
        itemToSave.password = userDetails.password;
        itemToSave.confirmPassword = userDetails.confirmPassword;
        itemToSave.role = [userDetails.role];
        itemToSave.email = userDetails.email;
       // itemToSave.address=userDetails.address;
       // itemToSave.pwdChanged=false;

        RegisterService.addUser(itemToSave).then(function (response) {
            if(response){
            	hideProcessDialog();
            	$scope.user=itemToSave.name;
            	 
            	 var data={};
					data.title="Congratulations!!!";
					data.text="Your account has been created successfully.Please login for more details.";
					
					showSuccesMessage(data);
            	
            }
        })
        }
    };


    $scope.init();

}]);