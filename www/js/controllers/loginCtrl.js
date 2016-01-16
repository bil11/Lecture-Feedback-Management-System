/* This part will implement the user login functionality 
*/

var ionicApp = angular.module('loginModule', ['ionic','ngCordova']);

ionicApp.controller('loginCtrl', ['$scope', '$rootScope','$firebaseObject','$ionicPlatform','$cordovaLocalNotification','$state', '$location', function($scope, $rootScope, $firebaseObject, $ionicPlatform, $cordovaLocalNotification, $state, $location){

	$scope.userLogin = function(data)
	{
		console.log('$scope.data.username : ' + $scope);
		var ref = new Firebase("https://feedback-system.firebaseio.com/");
		ref.authWithPassword({
			"email": data.username,
			"password": data.password
		}, function(error, authData) 
                    {
			if (error) 
                            {
				console.log("Login Failed!", error);
				alert("Wrong Credentials (Make sure you are connected to the internet");
                            } 
                        else 
                            {

				$scope.data = '';

				console.log("Authenticated successfully with payload:", authData.uid);
				getUserStatus(authData);
                                var loggedInUser = 'https://feedback-system.firebaseio.com/users/' + $rootScope.userauthen1;
                                var loggedInUserObject = new Firebase(loggedInUser);
                                if ($rootScope.userDT)
                                {
                                    loggedInUserObject.update({"userDeviceToken": $rootScope.userDT});
                                    console.log("token updated");
                                }
                                $state.go('tabs.courses');
                            }
                    });
        };

function getUserStatus(authData)
    {
    /* Now we will find out whether the logged in user is either a student or a
    ** professor. The email IDs provided to the students by the FH Kiel administration
    ** has "student" in it (for example xyz@student.fh-kiel.de) so we will use this
    ** parameter to identify the status of the logged-in user.*/
    var userAuthentication = authData.uid;
    var emailId = authData.password.email.replace(/@.*/,'');  // remove everything after "@"
    var completeEmail = authData.password.email; 
    var studentOrProf = completeEmail.indexOf("student"); // check whether the email id has "student" in it or not
    
    // Firebase creates it's own unique user IDs. So to keep things manageable, 
    // we are extracting the last character of the user ID (created by Firebase) 
    // which is a number and appending it with the email ID provided by FH Kiel
    // to create our own unique IDs.
    var ln = userAuthentication.length; 
    userAuthentication = emailId + userAuthentication.charAt(ln-1);
    var str = userAuthentication.split(".");
    userAuthentication = str.join("");
    console.log ("user auth is " + userAuthentication);
    $rootScope.userauthen1 = userAuthentication;
    $rootScope.checker = studentOrProf; // checker will be "-1" if user is a professor and greater than zero otherwise                        
    }
}]);

