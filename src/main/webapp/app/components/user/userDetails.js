truckTransApp.controller('userDetailsController',['$scope','$rootScope','userDetailsService','HistoryService','TruckService',function($scope, $rootScope, userDetailsService,HistoryService,TruckService) {
							$scope.isUpdate = false;
							$scope.user = {
									name : "",
									email : "",
									update : false,
									role : "User",
									profile : true,
									history : false,
									quote : false,
									notification : false
								};
								
							 $scope.postQuote={};
							
							$scope.init = function() {
								var email =null;
								email=localStorage.getItem('userEmail');
								
								hideProcessDialog();
								$rootScope.isLogin = true;
								
								if($rootScope.userName!= null && $rootScope.userName!=undefined && $rootScope.userName!=""){
									$scope.getUserProfile($rootScope.userName);
								}else{
									$scope.getUserProfile(email);
								}
								
								

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
								$scope.acceptedQuote=[];
								$scope.declinedQuote =[];
								
								/*$scope.acceptedQuote =[{id:"ABC001",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC002",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC006",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC010",details:"bgjdffgdjhjnghgfhmnfgh"}];
									
									
								$scope.declinedQuote =[{id:"ABC003",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC012",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC005",details:"bgjdffgdjhjnghgfhmnfgh"},
									                      {id:"ABC011",details:"bgjdffgdjhjnghgfhmnfgh"}];*/

								
								
								var userId=localStorage.getItem("userId");
								HistoryService.getAcceptedQuotes(userId).then(
										function(response) {
											
											if (response) {
												$scope.acceptedQuote=response;
												$scope.$apply();
											} else {

											}
										});
					

							}

							$scope.getSearchedQuotes=function(search){
								HistoryService.showSearchedQuote(search).then(
										function(response) {
										});
								
							}
							
							$scope.postYourQuote=function(postQuote){
								console.log(postQuote);
							
								var quote={};
								quote.price=postQuote.price;
								quote.remark=postQuote.remark;
								HistoryService.postYourQuote(quote).then(
										function(response) {
										});
								
							}
							$scope.showQuote = function() {
								$('ul li').removeClass('active');
								$('#putAQuote').addClass('active');
								
								
								
								
								$scope.user.history = false;
								$scope.user.profile = false;
								$scope.user.notification = false;
								$scope.user.quote = true;
								HistoryService.showQuote().then(
										function(response) {

											if (response) {
												$scope.quotes=response;
												
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
															
												
												
											} else {

											}
										});
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
								var email=localStorage.getItem("userEmail");
								
								if($rootScope.userName!= null && $rootScope.userName!=undefined && $rootScope.userName!=""){
									$scope.getUserProfile($rootScope.userName);
								}else{
									$scope.getUserProfile(email);
								}
								

							}

							$scope.viewDetails = function(quote) {
								$scope.quote = quote;
								$("#viewDetailsModal").modal("show");
							}

							$scope.updateUser = function(user) {
								console.log(user);
								showProcessDialog();
								
								$scope.isUpdate = false;

								hideProcessDialog();
								var data={};
								data.title="Congratulations!!!";
								data.text="Your account has been updated successfully";
								
								showSuccesMessage(data);
								
								var itemToLogin={};
								itemToLogin.id=user.userId;
								itemToLogin.pincode=user.pincode;
								itemToLogin.state=user.state;
								itemToLogin.city=user.companyCity;
								itemToLogin.landMark=user.landmark;
								itemToLogin.primaryPhone=user.primaryPhone1;
								itemToLogin.secondaryPhone=user.primaryPhone2;
								
								itemToLogin.login=user.email;
								itemToLogin.screenName=user.name;
								itemToLogin.email=user.email;
								
								itemToLogin.userId=user.userId;
								
								
								itemToLogin.name=user.name;
								itemToLogin.role=user.role;
								
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
								
								var data={};
								data.title="Congratulations!!!";
								data.text="Invoice downloaded successfully";
								
								showSuccesMessage(data);
								
							}
							
							
							$scope.getUserProfile=function(userName){
								userDetailsService.getUserDetails(userName).then(
										function(response) {

											if (response) {
												console.log(response);
												$rootScope.loggedInUser = response.name;
												$scope.user.name= response.name;
												$scope.user.email= response.email;
												$scope.user.landMark= response.detailsInfoDTO.landMark;
												$scope.user.pincode= response.detailsInfoDTO.pincode;
												$scope.user.primaryPhone1= response.primaryPhone;
												$scope.user.primaryPhone2= response.secondaryPhone;
												$scope.user.companyPinCode=response.secondaryPhone;
												$scope.user.state= response.state;
												$scope.user.userId= response.userId;
												$scope.user.profile = true;
												TruckService.setUser($scope.user);
												console.log($scope.user);
												localStorage.setItem('userEmail',$scope.user.email);
												localStorage.setItem('userId',$scope.user.userId);
												$scope.$apply();
												
												
											} else {

											}
											hideProcessDialog();
										});
							}
							
							
							
							
							$scope.ChangePassword=function(passData){
								
								if(passData.newPassword === passData.confirmPassword){
									
											
											var itemToSend={};
											itemToSend.oldPassword=passData.oldPassword;
											itemToSend.newPassword=passData.newPassword;
											itemToSend.confirmPassword=passData.confirmPassword;
											itemToSend.userName=passData.name;
											itemToSend.email=passData.email;
											console.log(itemToSend);
										userDetailsService.updatePassword(itemToSend).then(function(response){
											if(response.changed){
												console.log(response);
												$scope.user.oldPassword="";
												$scope.user.newPassword="";
												$scope.user.confirmPassword="";
												var data={};
												data.title="Congratulations!!!";
												data.text="Password updated successfully";
												
												showSuccesMessage(data);
												
												
												
											}else{
												var data={};
												data.title="Authentication Fail";
												data.text=response.message;
												showErrorMessage(data);
												
											}
										});
										
								}else{
									$scope.user.newPassword="";
									$scope.user.confirmPassword="";
									var data={};
									data.title="Validation Fail";
									data.text="New password and confirm password should be same.";
									showErrorMessage(data);
									//alert("New password and confirm password should be same.")
									
									
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