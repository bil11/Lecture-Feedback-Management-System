/* Here we will fetch the list of all the feedbacks (of a particular course that
 * the user has given over time) from the firebase database and will show them 
 * to the user (via feedback.html). Also, here we will implement the functionality
 * which will enable the student to give a new feedback.  
 */

var ionicApp = angular.module('feedbackModule', ['ionic']);
ionicApp.controller('feedbackCtrl', ['$scope', '$rootScope','$state', '$firebaseArray', '$ionicPopup' ,function($scope, $rootScope, $state ,$firebaseArray, $ionicPopup){

// Fetching the list of all the feedbacks that the student has given about a 
// particular course (this list will be shown if the user logged in is a student)
var feedbackLink = 'https://feedback-system.firebaseio.com/users/' + $rootScope.userauthen1 + "/mycourses/" + $rootScope.coursename + "/feedback"; 
var feedbackLinkObject = new Firebase(feedbackLink);

// Fetching the list of all the feedbacks that the students have given about a 
// particular course (this list will be shown if the user logged in is a professor)
var feedbackLinkProf = 'https://feedback-system.firebaseio.com/users/' + $rootScope.lectureridentity + "/mycourses/" + $rootScope.coursename + "/feedback";
var feedbackLinkProfObject = new Firebase(feedbackLinkProf);

// Fetching the logo url of Feedback
var feedbackLogo = 'https://feedback-system.firebaseio.com/feedbackImage';
var feedbackLogoObject = new Firebase(feedbackLogo); 
feedbackLogoObject.on("value", function(feedbackLogoLink)
{
  $scope.fbLogo = feedbackLogoLink.val();
});


  $scope.feedbacks = $firebaseArray(feedbackLinkObject); 

      $scope.fbCtrl = function()
      {
        $scope.data = {}
        var feedbackDate = getDate();
        var mypopup = $ionicPopup.show
        ({
          template: '<textarea placeholder="Enter text here..." ng-model="data.feedback"></textarea>',
          title: 'Enter Your Feedback',
          scope: $scope,
          buttons: 
          [
            { text: 'Cancel' },
            {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) 
                        {
                          updateFeedback(feedbackDate)
                        }
            }
          ]
        });           
       }
        
        function AddZero(num) 
        {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }
      
        //** Function getDate will get the current date
        function getDate()
        {
            var now = new Date();
            var feedback_date = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("."), [AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
            // Firebase does not accept special characters so we have to erase
            // special characters from the date
            var feedback_date_joined = feedback_date.split('.').join("");
            feedback_date_joined = feedback_date_joined.split(':').join("");
            feedback_date_joined = feedback_date_joined.split(' ').join("");
            var date = {'feedbackDate': feedback_date,
                         'feedbackDateJoined': feedback_date_joined
                        };
            return date;
        }
        
        //** Function updateFeedback will update the student's feedback in the database
        function updateFeedback(date)
        {
            console.log($scope.data.feedback);
            var usersRef = feedbackLinkObject.child(date.feedbackDateJoined);
            var usersRefProf = feedbackLinkProfObject.child(date.feedbackDateJoined);
            usersRef.update({
                            "date": date.feedbackDate,
                            "feedback": $scope.data.feedback 
                            });
            usersRefProf.update({
                            "date": date.feedbackDate,
                            "feedback": $scope.data.feedback 
                               });   
        }
      
}]);
