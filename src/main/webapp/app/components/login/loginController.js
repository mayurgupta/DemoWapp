/**
 * Created by Laxmi on 2/25/2016.
 */
truckTransApp.controller('LoginController', ['$scope','$rootScope','$location', 'LoginService', function ($scope,$rootScope,$location, LoginService) {
    $scope.login = function (loginData) {
        $("#myModal").modal("hide");
       
        
        var itemToLogin={};
        itemToLogin.username=loginData.id;
        itemToLogin.password=loginData.password;
        showProcessDialog();
 
        LoginService.doLogin(itemToLogin).then(function (response) {
        	console.log("-----");
        	console.log(response);
            if (response) {
            	 location.path("/userDashboard");
            } else {
                alert("Username/Password is wrong please login again");
            }
           
            
            
            
        })
        
        hideProcessDialog();
        
       $location.path("/userDashboard");
    }
$scope.loginClose=function(){
	$("#myModal").hide();
	
	
}

$scope.doLogout=function(){
	$rootScope.isLogin=false;
	$location.path("/");
}


}]);