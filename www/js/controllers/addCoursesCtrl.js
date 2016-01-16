/* Here, we will fetch the list of all the courses available (from the firebase
 * database) and show them to the student (via addCourses.html) so that he or 
 * she can add courses to his or her list.
 */

var ionicApp = angular.module('addCoursesModule', ['ionic']);

ionicApp.controller('addCoursesCtrl', ['$scope', '$rootScope','$firebaseArray', '$state', function($scope, $rootScope, $firebaseArray, $state){

// Fetching the complete list of courses from the database
    var coursesLink = 'https://feedback-system.firebaseio.com/Courses';
	var coursesFromFirebase = new Firebase(coursesLink);
	$scope.courses = $firebaseArray(coursesFromFirebase);	

// Fetching the student's list of courses
	var usercoursesLink = 'https://feedback-system.firebaseio.com/users/';
		usercoursesLink = usercoursesLink + $rootScope.userauthen1 + "/mycourses"

	var usercoursesFromFirebase = new Firebase(usercoursesLink);
        $scope.userCourses = $firebaseArray(usercoursesFromFirebase);
		var tempArr;
		var tempStr;
		var userRef;

/* Check whether the course is already in user's courses list. If true, ensure
   that the check button is set to 'true'
*/
        $scope.userCourses.$loaded().then(function()        
        {
            $scope.courses.$loaded().then(function()
            {
                   angular.forEach($scope.userCourses, function(course)
                    {
                        for (var i=0; i<$scope.courses.length; i++)
                        {

                            if ($scope.courses[i].name == course.name)
                            {
                                $scope.courses[i].checked = true;   
                            }                
                        }
                    });
            });
        });


/* When the user "checks" the item (i.e a course from the list), the item should
 * be added to his courses list. "Unchecking" the item will remove the course 
 * from his list
 */
	$scope.selectedCourse = function(item){
		if(item.checked)
		{
			tempArr = item.name;
			tempArr = tempArr.split(" ");
			tempStr = tempArr.join("");
			userRef = usercoursesFromFirebase.child(tempStr);
			console.log(usercoursesLink);
			userRef.update({
				name: item.name,
				img: item.img,
				lecturer: item.lecturer,
                                profid: item.profid
			});
		}
		else
		{
                        tempArr = item.name;
			tempArr = tempArr.split(" ");
			tempStr = tempArr.join("");
			userRef = usercoursesFromFirebase.child(tempStr);
			userRef.remove();
		}
	};
}]);
