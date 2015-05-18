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
  $scope.currentMenu = function() {
    return cafeService.currentMenu();
  };

  $scope.days = function() { return cafeService.days; };
  $scope.items = function() { return cafeService.items; };
  $scope.cor_icons = function() { return cafeService.cor_icons; };

  $scope.formatTime = function(daypart) {
    return formatTime(daypart.starttime) + ' - ' + formatTime(daypart.endtime);
  };

  $scope.doRefresh = function() {
    return cafeService.refreshMenu(function(){
      console.log('cafe menu refreshed');
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
})


.controller('ChapelsCtrl', function($scope, $http) {
  $http.get('https://gist.githubusercontent.com/halloffame/122124a23185dc246382/raw/7bbd24dbf259f55c04a404eee46d1b6595a85ff6/chapels.json')
    .then(function(res){
      $scope.chapels = res.data.events.slice(0,50);
    });

  $scope.formatDate = function(date) {
    date = new Date(date)
    return date.toDateString() + " @ " + date.toLocaleTimeString();
  }
  $scope.formatSpeakers = function(speakers) {
    return speakers.map(function(s){ return s.name; }).join(', ');
  }
})

.controller('ChapelCtrl', function($scope, $stateParams, $http, $filter) {
  // $http.get('https://apps.biola.edu/chapel/api/v1/academic_years/12/events.json')
  $http.get('https://gist.githubusercontent.com/halloffame/122124a23185dc246382/raw/7bbd24dbf259f55c04a404eee46d1b6595a85ff6/chapels.json')
    .then(function(res){
      // Todo, this should only query by ID. Or use already loaded data
      var chapels = res.data.events.slice(0,50);
      var found = $filter('filter')(chapels, {id: +$stateParams.chapelId}, true);
      if (found.length) {
        $scope.chapel = found[0];
      }
    });

  $scope.speakers = function() {
    $scope.chapel.speakers.join(', ');
  }

  $scope.formatDate = function(date) {
    date = new Date(date)
    return date.toDateString() + " @ " + date.toLocaleTimeString();
  }
  $scope.formatSpeakers = function(speakers) {
    return speakers.map(function(s){ return s.name; }).join(', ');
  }

});
