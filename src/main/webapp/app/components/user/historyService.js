/**
 * Created by Laxmi on 4/30/2016.
 */
truckTransApp.service('HistoryService', function($http) {

	var historyService = {
		getAcceptedQuotes : function(userData) {

			var promise = $.ajax({
				url : Server + "api/history/acceptedquotes",

				data: JSON.stringify(userData),
				type : "GET",
				contentType : "application/json",
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				dataType : "json"
			}).then(function(response) {
				// The then function here is an opportunity to modify the
				// response

				return response;
			});
			// Return the promise to the controller
			return promise;
		},
		getDeclinedQuotes : function(userData) {

			var promise = $.ajax({
				url : Server + "api/history/declinedquotes",

				data: JSON.stringify(userData),
				type : "GET",
				contentType : "application/json",
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				dataType : "json"
			}).then(function(response) {
				// The then function here is an opportunity to modify the
				// response

				return response;
			});
			// Return the promise to the controller
			return promise;
		},
		getInvoice : function(quoteid) {

			var promise = $.ajax({
				url : Server + "api/history/invoice/",

				 data:"quoteid="+encodeURIComponent(quoteid) ,
				type : "GET",
				contentType : "application/json",
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				dataType : "json"
			}).then(function(response) {
				// The then function here is an opportunity to modify the
				// response

				return response;
			});
			// Return the promise to the controller
			return promise;
		},
		showQuote:function(){
			var promise = $.ajax({
				url : Server + "api/bookingnquotes/searchbooking",

				// data:"quoteid="+encodeURIComponent(quoteid) ,
				type : "GET",
				contentType : "application/json",
				
				dataType : "json"
			}).then(function(response) {
				// The then function here is an opportunity to modify the
				// response

				return response;
			});
			// Return the promise to the controller
			return promise;
		}
		

	};

	return historyService;

});