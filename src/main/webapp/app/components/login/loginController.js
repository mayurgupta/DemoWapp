/**
 * Created by Laxmi on 2/25/2016.
 */
truckTransApp.controller('LoginController', ['$scope','$rootScope','$location','$timeout', 'LoginService', function ($scope,$rootScope,$location,$timeout, LoginService) {
    $scope.login = function (loginData) {
        $("#myModal").modal("hide");
       
        
        var itemToLogin={};
        itemToLogin.username=loginData.id;
        itemToLogin.password=loginData.password;
        showProcessDialog();
        $rootScope.userName= itemToLogin.username;
        LoginService.doLogin(itemToLogin).then(function (response) {
        	console.log("ddsfsdfsdf");
        })
        
       $timeout( function(){ 
    	      	   
    	   $location.path("/userDashboard"); 
       
       }, 3000);
       	 
        
        
      
    };
$scope.loginClose=function(){
	$("#myModal").hide();
	
	
}

$scope.doLogout=function(){
	$rootScope.isLogin=false;
	$location.path("/");
}


}]);