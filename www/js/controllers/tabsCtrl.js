
var ionicApp = angular.module('tabsModule', ['ionic']);

ionicApp.controller('tabsCtrl', ['$scope', '$rootScope', '$state', 'firebaseReferenceService', '$localstorage', function($scope, $rootScope, $state, firebaseReferenceService, $localstorage) {

        $rootScope.$on('$ionicView.beforeEnter', function() {

            $rootScope.hideTabs = false;

            if ($state.current.name === 'tabs.courses') {
                $rootScope.hideTabs = true;
            }
        });

        $scope.exitApplication = function(){
          ionic.Platform.exitApp();
        }



        $scope.logout = function()
        {
            firebaseReferenceService.firebaseMainAppObjectReference.unauth();
            $localstorage.set('login', 'false');
            $state.go('login');
        }

    }]);
