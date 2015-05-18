angular.module('starter.services', [])

.service('cafeService', function($http, $filter) {
  var _thisService = this;

  this.refreshMenu = function(callback) {
    $http.jsonp('http://api.biola.edu/cache/cafe/menu/17?callback=JSON_CALLBACK')
      .then(function(res){
        _thisService.days = res.data.days;
        _thisService.items = res.data.items;
        _thisService.cor_icons = res.data.cor_icons;
        if (callback) { callback(); }
      });
  };

  this.refreshMenu();

  this.currentMenu = function() {
    if (this.days) {
      var found = $filter('filter')(this.days, {date: moment().format('YYYY-MM-DD')}, true);
      if (found.length) {
        return found[0].cafes[17].dayparts[0]
      }
    }
  }
})
