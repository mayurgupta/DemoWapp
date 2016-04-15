truckTransApp.controller('userDetailsController',['$scope','$rootScope','userDetailsService','notificationService',function($scope, $rootScope, userDetailsService,notificationService) {
							$scope.isUpdate = false;
							$scope.init = function() {
								$rootScope.isLogin = true;
								$rootScope.user = "Laxmi";
								$scope.user = {
									name : "Laxmi Deshmukh",
									email : "laxmi.deshmukh@gmail.com",
									update : false,
									role : "User",
									profile : true,
									history : false,
									quote : false,
									notification : false
								}

							}
							$scope.isUpdate = function(update) {
								$scope.isUpdate = !update;
							}

							$scope.showHistory = function() {
								$scope.user.profile = false;
								$scope.user.quote = false;
								$scope.user.notification = false;
								$scope.user.history = true;

							}

							$scope.showQuote = function() {
								$scope.user.history = false;
								$scope.user.profile = false;
								$scope.user.notification = false;
								$scope.user.quote = true;
							}

							$scope.getNotification = function() {
								$scope.user.history = false;
								$scope.user.quote = false;
								$scope.user.profile = false;
								$scope.user.notification = true;
								
								notificationService.getNotifications(userData).then(function(response){
									if(response){
										
									}else{
										
									}
								});
								
							}

							$scope.showProfile = function() {
								$scope.user.notification = false;
								$scope.user.history = false;
								$scope.user.quote = false;
								$scope.user.profile = true;
														
								
								
							}

							$scope.viewDetails = function(quote) {
								$scope.quote = quote;
								$("#viewDetailsModal").modal("show");
							}

							$scope.updateUser = function(user) {
								console.log(user);
								showProcessDialog();
								$rootScope.token = "U";
								$scope.isUpdate = false;

								hideProcessDialog();
								$("#successModal").modal("show");
								/*
								 * userDetailsService.doUpdate(itemToLogin).then(function
								 * (response) { if (response) { } else {
								 * alert("Please try again later"); }
								 * 
								 * 
								 *  })
								 */

							}

							// some raw data here...
							$scope.quotes = [
									{
										source : "Pune",
										sourceAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										zip : "411057",
										des : "Bhopal",
										desAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										truck : "ABC",
										user : "Laxmi",
										itemDetails : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
									},
									{
										source : "Pune",
										sourceAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										zip : "411057",
										des : "Bhopal",
										desAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										truck : "ABC",
										user : "Mayur",
										itemDetails : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
									},
									{
										source : "Pune",
										sourceAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										zip : "411057",
										des : "Bhopal",
										desAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										truck : "ABC",
										user : "Harshlata",
										itemDetails : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
									},
									{
										source : "Pune",
										sourceAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										zip : "411057",
										des : "Bhopal",
										desAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										truck : "ABC",
										user : "Kushal",
										itemDetails : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
									},
									{
										source : "Pune",
										sourceAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										zip : "411057",
										des : "Bhopal",
										desAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										truck : "ABC",
										user : "Ankit",
										itemDetails : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
									},
									{
										source : "Pune",
										sourceAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										zip : "411057",
										des : "Bhopal",
										desAdd : "B-7,2nd floor, Delta Melodies, Kaspate wasti, wakad, Pune",
										truck : "ABC",
										user : "Akansha",
										itemDetails : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."

									} ]

							$scope.init();

						} ]);