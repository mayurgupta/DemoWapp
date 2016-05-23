/**
 * Created by Laxmi on 4/30/2016.
 */
truckTransApp.service('HistoryService', function($http) {

	var historyService = {
		getAcceptedQuotes : function(userData) {

			var promise = $.ajax({
				url : Server + "api/history/myquotes",
				data:"userId="+userData,
				//data: JSON.stringify(userData),
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
		postYourQuote : function(quote) {

			var promise = $.ajax({
				url : Server + "api/history/postyourquote",

				data: "price="+encodeURIComponent(quote.price)+",remark="+encodeURIComponent(quote.remark),
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
		},
		showSearchedQuote:function(search){
			var promise = $.ajax({
				url : Server + "api/bookingnquotes/searchbooking",
				data:"source="+search.source+",destination="+search.destination+",datefrom="+search.datefrom+",dateto="+search.dateto+",offset=20" ,
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