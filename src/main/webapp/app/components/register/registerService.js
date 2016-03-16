/**
 * Created by Laxmi on 3/14/2016.
 */
truckTransApp.service('RegisterService', function ($http) {
    var registerService = {

        addUser: function (userData) {
            // showProcessDialog();
            console.log(userData);
            var promise = $.ajax({
                url: Server + "api/users/registeruser",
                data: JSON.stringify(userData),
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


    return registerService;

});