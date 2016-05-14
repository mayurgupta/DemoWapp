/**
 * Created by Laxmi on 2/25/2016.
 */
truckTransApp.service('LoginService',['$location', function ($http,$location) {
	
    var loginService = {
        doLogin: function (loginData) {
        	this.serialize = function(obj) {
        	    var str = [];
        	    for ( var p in obj) {
        	      if (obj.hasOwnProperty(p)) {
        	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        	      }
        	    }
        	    return str.join("&");
        	  };
             showProcessDialog();
            console.log(loginData);
            var promise = $.ajax({
                url: Server + "api/authenticate",
                data: this.serialize(loginData),
//                data: JSON.stringify(loginData),
                type: "POST",
                contentType: "application/json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                dataType: "json"
            }).error(function(data) {
         //  return data;
           $location.path="/userDashboard";
            	//location.path("/userDashboard");
            }).success(function(data) {
            	 return data;
            	// console.log(data);
            	//location.path("/userDashboard");
            });
            // Return the promise to the controller
            return promise;
        }

    };


    return loginService;

}]);