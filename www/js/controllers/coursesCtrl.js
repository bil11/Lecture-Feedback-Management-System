/* Here, we will fetch the student's list of courses (i.e. the courses in which
 * the student is being enrolled) and will show the list to the user 
 * (via courses.html).
 */

var ionicApp = angular.module('coursesModule', ['ionic']);

ionicApp.controller('coursesCtrl', ['$scope', '$rootScope', '$firebaseArray', '$state','loginService', function($scope, $rootScope, $firebaseArray, $state, loginService){

// Fetching the list of student's courses
if ($rootScope.userauthen1 !== undefined)
{
        var coursesLink = 'https://feedback-system.firebaseio.com/users/';
      coursesLink = coursesLink + $rootScope.userauthen1 + "/mycourses";

	var coursesFromFirebase = new Firebase(coursesLink);
        console.log('courses tab userauthen1: ' + $rootScope.userauthen1);
	$scope.userCourses = $firebaseArray(coursesFromFirebase);	

    ////////-----------////////////

//    var userDeviceTokenLink = 'https://feedback-system.firebaseio.com/users/' + $rootScope.userauthen1;
//    var deviceTokenObject = new Firebase(userDeviceTokenLink);
//
//    deviceTokenObject.update({
//       "userDeviceToken": $rootScope.userDT 
//    });
}
///////*********///////////////


/* There's an option to add further courses and the button is located at the
 * top right side of courses.html view. If that button is being clicked, navigate
 * the user to that tab.
 */
	$scope.addCourses = function()
	{
		$state.go('tabs.addcourses');
	}

/* When user clicks on a course, take him to the feedback tab of that particular
 * course. This tab will list all of the feedbacks that the user has given over 
 * time. 
 */
	$scope.func = function(name,lecturerid)
	{
		var tempArr = name;
		var tempArr = tempArr.split(" ");
		var tempStr = tempArr.join("");
		console.log('lecturerid is :' + lecturerid);
		$rootScope.coursename = tempStr;
		$rootScope.lectureridentity = lecturerid;
		$state.go('tabs.feedback');
	}

}]);
