truckTransApp.service('BookingService', function ($http) {
        var bookingService = {

            confirmBookingBeforeLogin: function (bookingData) {
               // showProcessDialog();
                console.log(bookingData);
                var promise = $.ajax({
                    url: Server + "ign/init/planguesttransportation",
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
            },
            confirmBooking: function (bookingData) {
                    var url="ign/basic/planguesttransportation";
                    if(localStorage.getItem('userEmail')!=null && localStorage.getItem('userEmail') != undefined && localStorage.getItem('userEmail') && ""){
                            url="api/dashboards/plantransportation";
                    }
               // showProcessDialog();
                console.log(bookingData);
                var promise = $.ajax({
                    url: Server + url,
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
