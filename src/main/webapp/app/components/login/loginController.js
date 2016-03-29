/**
 * Created by Laxmi on 2/25/2016.
 */
truckTransApp.controller('LoginController', ['$scope','$rootScope','$location', 'LoginService', function ($scope,$rootScope,$location, LoginService) {
    $scope.login = function (loginData) {
        $("#myModal").modal("hide");
       
        
        var itemToLogin={};
        itemToLogin.userName=loginData.id;
        itemToLogin.password=loginData.password;
        showProcessDialog();
/*
        LoginService.doLogin(itemToLogin).then(function (response) {
            if (response) {

            } else {
                alert("Username/Password is wrong please login again");
            }
            location.path("/userDashboard");
            
            
            
        })*/
        
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