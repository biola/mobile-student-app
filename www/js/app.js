// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.cafe', {
    url: "/cafe",
    views: {
      'menuContent': {
        templateUrl: "templates/cafe.html",
        controller: 'CafeCtrl'
      }
    }
  })

  .state('app.chapels', {
    url: "/chapels",
    views: {
      'menuContent': {
        templateUrl: "templates/chapels.html",
        controller: 'ChapelsCtrl'
      }
    }
  })

  .state('app.chapel', {
    url: "/chapels/:chapelId",
    views: {
      'menuContent': {
        templateUrl: "templates/chapel.html",
        controller: 'ChapelCtrl'
      }
    }
  })

  .state('app.links', {
    url: "/links",
    views: {
      'menuContent': {
        templateUrl: "templates/links.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/chapels');
});
