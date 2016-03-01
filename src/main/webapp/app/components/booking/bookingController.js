truckTransApp.controller('bookingController', ['$scope', 'BookingService', function ($scope, BookingService) {
    $scope.book = function (bookingData) {
        console.log(bookingData);
        var itemToBook = {};
        itemToBook.Name = bookingData.name;
        itemToBook.email = bookingData.email;
        itemToBook.primaryContact = bookingData.primaryContact;
        itemToBook.secondaryContact = bookingData.secondaryContact;
        itemToBook.srcCity = bookingData.srcCity;
        itemToBook.srcState = bookingData.srcState;
        itemToBook.srcAddress = bookingData.srcAddress;
        itemToBook.SourcePin = bookingData.srcPin;
        itemToBook.goodsDescp = bookingData.goodsDescp;

        itemToBook.desname = bookingData.desname;
        itemToBook.desPrimarycontact = bookingData.desPrimarycontact;
        itemToBook.desSecondarycontact = bookingData.desSecondarycontact;
        itemToBook.desAddress = bookingData.desAddress;
        itemToBook.desPin = bookingData.desPin;
        itemToBook.remarks = bookingData.remarks;

        BookingService.confirmBooking(itemToBook).then(function (response) {
        	console.log(response);
            if (response) {

            } else {
console.log(response);
            }
        })
    }

}]);