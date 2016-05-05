/**
 * Created by Laxmi on 3/25/2016.
 */
truckTransApp.service('userDetailsService', function ($http) {
    var userDetailsService = {

        doUpdate: function (userData) {
            // showProcessDialog();
            console.log(userData);
            var promise = $.ajax({
                url: Server + "api/users/",
                data:"userId="+encodeURIComponent(userId),
                type: "PUT",
                contentType: "application/json",
                dataType: "json"
            }).then(function (response) {
                // The then function here is an opportunity to modify the response

                return response;
            });
            // Return the promise to the controller
            return promise;
        }, getUserDetails: function (userId) {
            // showProcessDialog();
          //  console.log(userData);
            var promise = $.ajax({
                url: Server + "api/users/25",
              // data:"userId="+encodeURIComponent(userId) ,
                type: "GET",
                contentType: "application/json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
               dataType: "json"
            }).then(function (response) {
                // The then function here is an opportunity to modify the response

                return response;
            });
            // Return the promise to the controller
            return promise;
        }, updatePassword: function (userData) {
            // showProcessDialog();
            //  console.log(userData);
              var promise = $.ajax({
                  url: Server + "api/users/changePassword",
                 data:JSON.stringify(userData) ,
                  type: "POST",
                  contentType: "application/json",
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                 dataType: "json"
              }).then(function (response) {
                  // The then function here is an opportunity to modify the response

                  return response;
              });
              // Return the promise to the controller
              return promise;
          },
          getNotifications:function (userData) {
              // showProcessDialog();
              //  console.log(userData);
                var promise = $.ajax({
                    url: Server + "api/users/getNotification",
                   data:JSON.stringify(userData) ,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                   dataType: "json"
                }).then(function (response) {
                    // The then function here is an opportunity to modify the response

                    return response;
                });
                // Return the promise to the controller
                return promise;
            }
        

    };


    return userDetailsService;

});