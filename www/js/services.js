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

  this.refresh = function(callback) {
    // $http.json('http://localhost:3000/api/v2/events?limit=40&upcoming=true')
    $http.get('https://gist.githubusercontent.com/halloffame/122124a23185dc246382/raw/7bbd24dbf259f55c04a404eee46d1b6595a85ff6/chapels.json')
      .then(function(res){
        _thisService.events = res.data.events;
        if (callback) { callback(); }
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
      $http.json('http://localhost:3000/api/v2/events/' + chapelId)
      .then(function(res){
        callback(res.data.event);
      });
    }
  }

})
