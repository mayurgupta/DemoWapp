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
        $rootScope.userName= itemToLogin.username;
        LoginService.doLogin(itemToLogin).then(function (response) {
        	console.log("ddsfsdfsdf");
       	// location.path("/userDashboard");
        })
        
       // $rootScope.userName= itemToLogin.username;
       	// $location.path("/userDashboard");
        
        
      // $location.path("/userDashboard");
    };
$scope.loginClose=function(){
	$("#myModal").hide();
	
	
}

$scope.doLogout=function(){
	$rootScope.isLogin=false;
	$location.path("/");
}


}]);