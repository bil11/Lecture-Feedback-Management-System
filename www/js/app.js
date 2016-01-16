// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var ionicApp = angular.module('feedback-system', ['ionic','ionic.service.core', 'firebase', 'coursesModule', 'feedbackModule', 'loginModule', 'servicesModule', 'tabsModule', 'notificationModule', 'addCoursesModule']);

ionicApp.run(function($ionicPlatform, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    // Check whether the app is running on a mobile device or on a browser
var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;    
    if (app)
    {
        // The getUserToken function will fetch the user's device token
        getUserToken();
        console.log('this is mobile device');
    }

function getUserToken()
    {        
        Ionic.io();     
        var push = new Ionic.Push(
            {
            "onNotification": function(notification)
                {
                    alert("new notification ");
                    console.log(notification);
                }
            });    
        
        var callback = function(deviceToken)
            {
            $rootScope.userDT = deviceToken.token;
            console.log($rootScope.userDT);
            };
        push.register(callback);
    }
});

var ref = new Firebase("https://feedback-system.firebaseio.com/");
    var authData = ref.getAuth();
    
    if (authData) {
      $state.go('tabs.courses');
    }  
});


ionicApp.config(function($stateProvider, $ionicConfigProvider,$urlRouterProvider, $urlMatcherFactoryProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginCtrl'
  })

  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'views/main.html',
    controller: 'tabsCtrl'
  })

  .state('tabs.courses', {
    url: '/courses',
    views:{
      'coursesView':{    
        templateUrl: 'views/courses.html',
        controller: 'coursesCtrl'
      }
    }
  })
  .state('tabs.addcourses',{
    url:'/courses/addcourses',
    views:{
      'coursesView':{
        templateUrl: 'views/addCourses.html',
        controller: 'addCoursesCtrl'
      }
    }
  })

  .state('tabs.feedback', {
    url: '/feedback',
    views:{
      'feedbackView':{
        templateUrl: 'views/feedback.html',
        controller: 'feedbackCtrl'
      }
    }
  })

  .state('tabs.notifications', {
    url: '/notifications',
    views:{
      'notificationsView':{
        templateUrl: 'views/notification.html',
        controller: 'notificationCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise("/tabs/courses");
  $ionicConfigProvider.views.maxCache(0);

});
