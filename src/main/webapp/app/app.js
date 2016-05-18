/**
 * Created by Laxmi on 10/3/2015.
 */
var truckTransApp = angular.module('truckTransApp', ['ngRoute']);
var Server="http://localhost:8081/techtrans/";


truckTransApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/', {
            templateUrl: 'app/components/home/home.html',
            controller: 'HomeController'
        }).when('/userDashboard', {
            templateUrl: 'app/components/user/userDetails.html',
            controller: 'userDetailsController'
        });
}]);

truckTransApp.run(function($rootScope) {
	$rootScope.userName='';
	$rootScope.isLogin=false;
	$rootScope.loggedInUser = "";
    $rootScope.token = "C";
    $rootScope.messages = {
    		updateUser : "Your account has been updated successfully",
    		createUser : "Your account has been created successfully.Please login for more details.",
    		downloadInvoice :"Invoice downloaded successfully",
    		error:"Invalid credentials",
    		errorMessage:"Please try again later."
    	};
    
})

truckTransApp.constant('messages1',{
	updateUser : "Your account has been updated successfully",
	createUser : "Your account has been created successfully.Please login for more details.",
	downloadInvoice :"Invoice downloaded successfully"
})

// function to show progress bar
    function showProcessDialog(){
	$('#progressBar').modal('show');
}
    
    function hideProcessDialog(){
    	$('#progressBar').modal('hide');
    }
    
    var loginStatus=false;
    function setLogin(status){
    	loginStatus=status;
    }
    function getLogin(){
    	return loginStatus;
    }
    
    
    

truckTransApp.controller('mainController',['$scope',function($scope) {
    $scope.openSignUpForm = function () {
              $("#user-sign-up").show();
    };

    $scope.signUp=function(user){
            console.log(user);
    };

   
    
    
    
    

}]);