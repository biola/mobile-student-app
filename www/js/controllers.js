angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CafeCtrl', function($scope, cafeService) {
  $scope.helpers = Helpers.cafe;

  $scope.currentMenu = function() { return cafeService.currentMenu(); };
  $scope.days = function() { return cafeService.days; };
  $scope.items = function() { return cafeService.items; };
  $scope.cor_icons = function() { return cafeService.cor_icons; };

  $scope.doRefresh = function() {
    return cafeService.refresh(function(){
      console.log('cafe menu refreshed');
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
})

.controller('ChapelsCtrl', function($scope, chapelService) {
  $scope.helpers = Helpers.chapel;
  $scope.chapels = function() {
    return chapelService.events;
  }
})

.controller('ChapelCtrl', function($scope, $stateParams, chapelService) {
  $scope.helpers = Helpers.chapel;
  chapelService.findOne($stateParams.chapelId, function(result) {
    $scope.chapel = result;
  });
});
