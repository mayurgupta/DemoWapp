/**
 * Created by Laxmi on 2/25/2016.
 */
truckTransApp.service('LoginService', function ($http) {
    var loginService = {

        doLogin: function (loginData) {
            // showProcessDialog();
            console.log(loginData);
            var promise = $.ajax({
                url: Server + "/truckTrans/login",
                data: JSON.stringify(loginData),
                type: "POST",
                contentType: "application/json",
                dataType: "json"
            }).then(function (response) {
                // The then function here is an opportunity to modify the response

                return response;
            });
            // Return the promise to the controller
            return promise;
        }

    };


    return loginService;

});