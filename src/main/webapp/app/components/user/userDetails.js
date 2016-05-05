truckTransApp
		.controller(
				'userDetailsController',['$scope','$rootScope','userDetailsService','HistoryService',function($scope, $rootScope, userDetailsService,HistoryService) {
							$scope.isUpdate = false;
							$scope.init = function() {
								$rootScope.isLogin = true;
								$rootScope.loggedInUser = "Laxmi";
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
								var userId = 25;
								userDetailsService.getUserDetails(userId).then(
										function(response) {

											if (response) {

											} else {

											}
										});

							}
							$scope.isUpdate = function(update) {
								$scope.isUpdate = !update;
							}

							$scope.showHistory = function() {
								$('ul li').removeClass('active');
								$('#history').addClass('active');
								$scope.user.profile = false;
								$scope.user.quote = false;
								$scope.user.notification = false;
								$scope.user.history = true;
								
								$scope.acceptedQuote =[{id:"ABC001",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC002",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC006",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC010",details:"bgjdffgdjhjnghgfhmnfgh"}];
									
									
								$scope.declinedQuote =[{id:"ABC003",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC012",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC005",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC011",details:"bgjdffgdjhjnghgfhmnfgh"}];

								
								
								
								/*HistoryService.getAcceptedQuotes(userId).then(
										function(response) {
											
											if (response) {
												$scope.acceptedQuote=response;
											} else {

											}
										});*/
					
								/*HistoryService.getDeclinedQuotes(userId).then(
										function(response) {

											if (response) {
												$scope.declinedQuote=response;
											} else {

											}
										});*/

							}

							$scope.showQuote = function() {
								$('ul li').removeClass('active');
								$('#putAQuote').addClass('active');
								
								$scope.user.history = false;
								$scope.user.profile = false;
								$scope.user.notification = false;
								$scope.user.quote = true;
							}

							$scope.getNotification = function() {
								$('ul li').removeClass('active');
								$('#notification').addClass('active');
								$scope.user.history = false;
								$scope.user.quote = false;
								$scope.user.profile = false;
								$scope.user.notification = true;

								$scope.notifications = [ {
									subject : "Invoice for Mahindra Maxximo Load Pune to Mumbai 30 tonnes",
									sender : "Trucktrans"
								}, {
									subject : "Invoice for Mahindra Maxximo Load Pune to Mumbai 30 tonnes",
									sender : "Trucktrans"
								}, {
									subject : "Invoice for Mahindra Maxximo Load Pune to Mumbai 30 tonnes",
									sender : "Trucktrans"
								}, {
									subject : "Invoice for Mahindra Maxximo Load Pune to Mumbai 30 tonnes",
									sender : "Trucktrans"
								} ];
								
								/*userDetailsService.getNotifications(userData).then(function(response) {
											if (response) {

											} else {

											}
										});*/

							}

							$scope.showProfile = function() {
								
								$('ul li').removeClass('active');
								$('#profile').addClass('active');
								
								$scope.user.notification = false;
								$scope.user.history = false;
								$scope.user.quote = false;
								$scope.user.profile = true;
								
								
								userDetailsService.getUserDetails(userId).then(
										function(response) {

											if (response) {

											} else {

											}
										});
								

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
								
							userDetailsService.doUpdate(itemToLogin).then(function(response) { 
								
								if (response) {
									
								} else {
								 alert("Please try again later"); }
								  
								  })
								 

							}

							
							$scope.getInvoice=function(orderId){
								/*HistoryService.getInvoice(userId).then(function(response){
									if(response){
										
									}else{
										
									}
								});*/
								$rootScope.token = "D";
								
								$("#successModal").modal("show");
							}
							
							
							$scope.ChangePassword=function(passData){
								
								if(passData.newPassword === passData.confirmPassword){
									userDetailsService.authenticatePassword(passData.oldPassword).then(function(response){
										if(response){
											
											
											var itemToSend={};
											itemToSend.oldPassword=passData.oldPassword;
											itemToSend.newPassword=passData.newPassword;
											itemToSend.confirmPassword=passData.confirmPassword;
											itemToSend.userName=passData.name;
											itemToSend.email=passData.email;
											console.log(itemToSend);
										userDetailsService.updatePassword(itemToSend).then(function(response){
											if(response){
												
											}else{
												
											}
										});
										}else{
											
										}
									
									
									});
								}else{
									$scope.user.newPassword="";
									$scope.user.confirmPassword="";
									alert("New password and confirm password should be same.")
									
									
								}
								
								
							}
							
							
							
							
							// some raw data here...
							
							
							$scope.acceptedQuote =[{id:"ABC001",details:"bgjdffgdjhjnghgfhmnfgh"},
								                      {id:"ABC002",details:"bgjdffgdjhjnghgfhmnfgh"},
								                      {id:"ABC006",details:"bgjdffgdjhjnghgfhmnfgh"},
								                      {id:"ABC010",details:"bgjdffgdjhjnghgfhmnfgh"}];
								
								
							$scope.declinedQuote =[{id:"ABC003",details:"bgjdffgdjhjnghgfhmnfgh"},
								                      {id:"ABC012",details:"bgjdffgdjhjnghgfhmnfgh"},
								                      {id:"ABC005",details:"bgjdffgdjhjnghgfhmnfgh"},
								                      {id:"ABC011",details:"bgjdffgdjhjnghgfhmnfgh"}];

							
							
							
							
							
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

									} ];
							
							
							
							
							$scope.init();

						} ]);