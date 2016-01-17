/*  Here, we will fetch all the notifications created by the professor and will 
 *  show them to the user via notification.html. Also, if the logged-in user
 *  is a professor, he will be given an option to generate a new notification */

var ionicApp = angular.module('notificationModule', ['ionic']);
ionicApp.controller('notificationCtrl', ['$scope', '$rootScope', '$state', '$firebaseArray', '$ionicPopup', '$http', function($scope, $rootScope, $state, $firebaseArray ,$ionicPopup, $http){

var notificationLink = 'https://feedback-system.firebaseio.com/users/' + $rootScope.userauthen1 + "/mycourses/" + $rootScope.coursename + "/notification";
var notificationLinkObject = new Firebase(notificationLink);
    $scope.notifications = $firebaseArray(notificationLinkObject);
    
var allUsers = 'https://feedback-system.firebaseio.com/users/'; // grab the complete users' list
var allUsersObject = new Firebase(allUsers); 
  $scope.users = $firebaseArray(allUsersObject);
  
// Fetching the logo image url of notification
var notificationLogo = 'https://feedback-system.firebaseio.com/notificationImage';
var notificationLogoObject = new Firebase(notificationLogo); 
notificationLogoObject.on("value", function(notificationLogoLink)
{
  $scope.nLogo = notificationLogoLink.val();
});  


var userData;
getData();

$scope.notifyCtrl = function()
      {
        $scope.data = {};
        var currentDate = getDate();
        var mypopup = $ionicPopup.show  // popup window for generating new notification
        ({
          template: '<textarea placeholder = "Enter Title Here..." ng-model="data.titlee"></textarea><br><textarea placeholder="Enter Notification Here..." ng-model="data.notification"></textarea>',
          title: 'Generate Notification',
          description: 'Enter Details Here',
          scope: $scope,
          buttons: 
          [
            { text: 'Cancel' },
            {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) 
                        {
                          if ($scope.data.titlee == undefined || $scope.data.notification == undefined)
                          {
                              alert ("Fields cannot be empty");
                          }
                          else
                          {
                              updateNotification(userData, currentDate);
                              sendPush(userData);
                          }   
                        }
            }
          ]
        });           
      };
      
      function AddZero(num) 
      {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
      }
        
      //** This function will fetch the data from the database (notifications
      //** list as well as device tokens)
      function getData()
      {
        var arrayForNotifications = [];  // An empty array that will carry the names of the students enrolled in the subject
        var udtArray = [];
        $scope.users.$loaded()     // When the data has been loaded, call the function
        .then(function()
           {
            angular.forEach($scope.users, function(item) 
            {
             // ensure that the array only contains the IDs of enrolled students
             
              arrayForNotifications.push(item.$id);
              udtArray.push(item.userDeviceToken);
            });
                    userData = {'arrayForNotifications': arrayForNotifications,
                    'udtArray': udtArray
                   };
           });   
        //return userData;
      }
      
      //** This function will get the current date
      function getDate()
      {
        var now = new Date();  
        var notification_date = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("."), [AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
        var notification_date_joined = notification_date.split(':').join("");
        notification_date_joined = notification_date_joined.split('.').join("");
        notification_date_joined = notification_date_joined.split(' ').join("");
        var currentDate = {'notificationDate': notification_date,
                    'notificationDateJoined': notification_date_joined
                   };
        return currentDate;
      }
      
      function updateNotification(userData, currentDate)
      {
        var usersRef;
        var linkToSendAll; // Send the notification generated to all students enrolled in that course
        var link; // new object of above
        angular.forEach(userData.arrayForNotifications, function(entry)
        {
           linkToSendAll = allUsers + entry + "/mycourses/" + $rootScope.coursename + "/notification";
           link = new Firebase (linkToSendAll);
           usersRef = link.child(currentDate.notificationDateJoined);
           usersRef.update({
                            "title": $scope.data.titlee,
                            "date": currentDate.notificationDate,
                            "notification": $scope.data.notification 
                           });
        });
      }
      
      //** This function will initiate the 'push-notification' functionality
      function sendPush(userData)
      {
        var privateKey = '6c561baf4b4549f6acd82828f5edae305bf97f987e265e1a';
        var tokens = userData.udtArray;
        var appId = '0dd99f32';
        var auth = btoa(privateKey + ':');
        var req = {
                    method: 'POST',
                    url: 'https://push.ionic.io/api/v1/push',
                    headers:
                           {
                            'Content-Type': 'application/json',
                            'X-Ionic-Application-Id': appId,
                            'Authorization': 'basic ' + auth
                           },
                    data:
                           {
                            "tokens": tokens,
                            "notification": 
                                    {
                                        "alert": "check notification"
                                    }
                           }
                   };
        $http(req).success(function(resp)
        {
            console.log("Ionic Push: Push success!");
        }).error(function(error)
        {
            console.log("Ionic Push: Push error...");
        });
      }
      
}]);
