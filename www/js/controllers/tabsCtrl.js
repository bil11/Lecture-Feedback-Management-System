
var ionicApp = angular.module('tabsModule', ['ionic']);

ionicApp.controller('tabsCtrl', ['$scope', '$rootScope', '$state', 'firebaseReferenceService', '$localstorage', '$ionicSideMenuDelegate', function($scope, $rootScope, $state, firebaseReferenceService, $localstorage, $ionicSideMenuDelegate) {

        $rootScope.$on('$ionicView.beforeEnter', function() {

            $rootScope.hideTabs = false;

            if ($state.current.name === 'tabs.courses') {
                $rootScope.hideTabs = true;
            }
        });

        $scope.exitApplication = function(){
          ionic.Platform.exitApp();
        }

        $scope.toggleLeft = function()
        {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.logout = function()
        {
            firebaseReferenceService.firebaseMainAppObjectReference.unauth();
            $localstorage.set('login', 'false');
            $state.go('login');
        }

    }]);
