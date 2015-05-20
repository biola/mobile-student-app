angular.module('starter.services', [])

.service('cafeService', function($http, $filter) {
  var _thisService = this;

  this.refresh = function(callback) {
    $http.jsonp('http://api.biola.edu/cache/cafe/menu/17?callback=JSON_CALLBACK')
      .then(function(res){
        _thisService.days = res.data.days;
        _thisService.items = res.data.items;
        _thisService.cor_icons = res.data.cor_icons;
        if (callback) { callback(); }
      });
  };
  // Do inital refresh on load
  this.refresh();

  this.currentMenu = function() {
    if (this.days) {
      var found = $filter('filter')(this.days, {date: moment().format('YYYY-MM-DD')}, true);
      if (found && found.length) {
        return found[0].cafes[17].dayparts[0]
      }
    }
  }
})

.service('chapelService', function($http, $filter) {
  var _thisService = this;
  this.nextPage = 1;
  this.events = [];

  this.refresh = function(callback, resetPage) {
    if (resetPage) {
      _thisService.nextPage = 1;
    }

    // $http.get('http://localhost:3000/api/v2/events?upcoming=true')
    $http.get('http://localhost:3000/api/v2/events?page='+_thisService.nextPage)
      .then(function(res){
        if (resetPage) { _thisService.events = []; }
        _thisService.events = _thisService.events.concat(res.data.events);
        _thisService.nextPage = res.data.meta.next_page;
        if (callback) { callback(res.data.events); }
      });
  };
  // Do inital refresh on load
  this.refresh();

  this.findOne = function(chapelId, callback) {
    var found = $filter('filter')(_thisService.events, {id: +chapelId}, true);

    // Lookup from cache first, otherwise do a new api lookup
    if (found && found.length) {
      callback(found[0]);
    } else {
      $http.get('http://localhost:3000/api/v2/events/' + chapelId)
      .then(function(res){
        callback(res.data.event);
      });
    }
  }

  this.moreEvents = function(callback) {
    if (_thisService.nextPage) {
      _thisService.refresh(callback);
    } else {
      callback([]);
    }
  }

})
