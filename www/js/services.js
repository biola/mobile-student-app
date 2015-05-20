angular.module('starter.services', [])

.service('cafeService', function($http, $filter) {
  var self = this;
  self.isLoaded = false;

  self.refresh = function(callback) {
    $http.jsonp('http://api.biola.edu/cache/cafe/menu/17?callback=JSON_CALLBACK')
      .then(function(res){
        self.days = res.data.days;
        self.items = res.data.items;
        self.cor_icons = res.data.cor_icons;
        self.isLoaded = true;
        if (callback) { callback(); }
      });
  };

  // Do inital refresh on load
  self.refresh();

  self.currentMenu = function() {
    if (self.days) {
      var found = $filter('filter')(self.days, {date: moment().format('YYYY-MM-DD')}, true);
      if (found && found.length) {
        return found[0].cafes[17].dayparts[0]
      }
    }
  }
})

.service('chapelService', function($http, $filter) {
  var self = this;
  self.nextPage = 1;
  self.events = [];
  self.noEvents = false;

  self.refresh = function(callback, hardRefresh) {
    // Reset nextPage index back to 1. We will clear events further down after getting the
    //   response from the API but right before repopulating it.
    if (hardRefresh) { self.nextPage = 1; }

    // Query chapel api for upcoming events.
    $http.get('https://apps.biola.edu/chapel/api/v2/events?page='+self.nextPage) // ?upcoming=true
      .then(function(res){
        // Clear events if we are doing a hard reset
        if (hardRefresh) { self.events = []; }

        // Save events and increment nextPage index for infinite scrolling
        //   but first compare to make sure the current page is actually the page you are looking for.
        //   I was having problems with this getting called twice right away and since next_page isn't
        //   incremented until now it was making duplicate requests for page one, and it was showing
        //   duplicate events.
        if (res.data.meta.current_page === self.nextPage) {
          self.events = self.events.concat(res.data.events);
          self.nextPage = res.data.meta.next_page;
        }

        // Wait to set noEvents to true until after we hear back from the server
        if (!self.events.length) { self.noEvents = true; }

        if (callback) { callback(res.data.events); }
      });
  };
  // Do inital refresh on load
  self.refresh();

  self.findOne = function(chapelId, callback) {
    var found = $filter('filter')(self.events, {id: +chapelId}, true);

    // Lookup from cache first, otherwise do a new api lookup
    if (found && found.length) {
      callback(found[0]);
    } else {
      $http.get('https://apps.biola.edu/chapel/api/v2/events/' + chapelId)
      .then(function(res){
        callback(res.data.event);
      });
    }
  }

  // Used for infinite scrolling. nextPage will be nil if we have gotten to the last page.
  self.moreEvents = function(callback) {
    if (self.nextPage) {
      self.refresh(callback);
    } else {
      callback([]);
    }
  }

})
