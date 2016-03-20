/**
 * Created by Laxmi on 3/14/2016.
 */
truckTransApp.controller('RegisterController', ['$scope', 'RegisterService', function ($scope, RegisterService) {
    $scope.init = function () {

    };


    $scope.addUser = function (userDetails) {
    	console.log(userDetails);
        var itemToSave = {};
        itemToSave.name = userDetails.name;
        itemToSave.password = userDetails.password;
        itemToSave.confirmPassword = userDetails.confirmPassword;
        itemToSave.role = [1,3]/*userDetails.role*/;
        itemToSave.email = userDetails.email;
       // itemToSave.address=userDetails.address;



        RegisterService.addUser(itemToSave).then(function (response) {
            console.log(response);
        })
    };


    $scope.init();

}]);