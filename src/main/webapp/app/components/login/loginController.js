/**
 * Created by Laxmi on 2/25/2016.
 */
truckTransApp.controller('LoginController', ['$scope', 'LoginService', function ($scope, LoginService) {
    $scope.login = function (loginData) {
        $("#myModal").hide();
        userLogin=true;
        var itemToLogin={};
        itemToLogin.userName=loginData.id;
        itemToLogin.password=loginData.password;


        LoginService.doLogin(itemToLogin).then(function (response) {
            if (response) {

            } else {
                alert("Username/Password is wrong please login again");
            }
        })
    }

}]);