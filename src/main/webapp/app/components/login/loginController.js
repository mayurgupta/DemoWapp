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
        })

    	   $timeout(function() {
					if (getLogin()) {
						$location.path("/userDashboard");
					}
				}, 300);
       	 
    };
$scope.loginClose=function(){
	$("#myModal").hide();
	
	
}

$scope.doLogout=function(){
	$rootScope.isLogin=false;
	localStorage.setItem('userEmail',null);
	$location.path("/");
}


}]);