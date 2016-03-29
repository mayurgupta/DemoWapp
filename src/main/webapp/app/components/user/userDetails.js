truckTransApp.controller('userDetailsController', ['$scope','$rootScope','userDetailsService' ,function ($scope,$rootScope,userDetailsService) {
	$scope.isUpdate=false;
	$scope.init=function(){
		$rootScope.isLogin=true;
		$rootScope.user="Laxmi";
		$scope.user={
				name:"Laxmi Deshmukh",
				email:"laxmi.deshmukh@gmail.com",
				update:false,
				role:"User"
		}		
	}
	$scope.isUpdate=function(update){
		$scope.isUpdate=!update;
	}
	
	$scope.updateUser=function(user){
		console.log(user);
		showProcessDialog();
		 $rootScope.token = "U";
		 $scope.isUpdate=false;
		
		 hideProcessDialog();
		$("#successModal").modal("show");
		/*
        userDetailsService.doUpdate(itemToLogin).then(function (response) {
            if (response) {

            } else {
                alert("Please try again later");
            }
           
            
            
            
        })*/
		
		
	}
	
	
$scope.init();	
	
}]);