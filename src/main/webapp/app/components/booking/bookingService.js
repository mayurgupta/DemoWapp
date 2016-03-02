truckTransApp.service('BookingService', function ($http) {
        var bookingService = {

            confirmBooking: function (bookingData) {
               // showProcessDialog();
                console.log(bookingData);
                var promise = $.ajax({
                    url: Server + "api/dashboards/plantransportation",
                    data: JSON.stringify(bookingData),
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


        return bookingService;

    });