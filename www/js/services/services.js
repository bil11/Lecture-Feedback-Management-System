
var servicesModule = angular.module('servicesModule', ['ionic', 'ngCordova']);

servicesModule.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key) {
      return $window.localStorage[key] || undefined;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

servicesModule.service('firebaseReferenceService', ['$state', function($state){
    var ref = new Firebase("https://feedback-system.firebaseio.com/");
	return {firebaseMainAppObjectReference: ref};
}]);

servicesModule.service('loginService', ['$state', '$rootScope','$localstorage', function($state, $rootScope,$localstorage){

    var ref = new Firebase("https://feedback-system.firebaseio.com/");
    var authData = ref.getAuth();
    if (authData) 
        {
        // If true, the user is still logged-in so grab his data and direct him
        // to tabs view.
            $localstorage.set('login', 'true');
            getUserStatus(authData);

        } 
        else 
        {
            $state.go('login');
        }
        
function getUserStatus(authData)
    {
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
        $rootScope.userauthen1 = userAuthentication;
        $rootScope.checker = studentOrProf; // checker will be "-1" if user is a professor
        $state.go('tabs.courses');
    }
}]);