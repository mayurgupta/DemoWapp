/**
 * Created by Laxmi on 5/13/2016.
 */
truckTransApp.factory('TruckService', function ($http) {
	var loggedInUserData=null;
	
    return{

        setUser: function (userData) {
        	loggedInUserData=userData;
        },
        getUser:function(){
        	return loggedInUserData;
        }

    }


    
});