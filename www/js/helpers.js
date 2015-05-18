window.Helpers = {
  chapel: {
    formatDate: function(date) {
      date = new Date(date)
      return date.toDateString() + " @ " + date.toLocaleTimeString();
    },
    formatSpeakers: function(speakers) {
      return speakers.map(function(s){ return s.name; }).join(', ');
    }
  },

  cafe: {
    formatTime: function(daypart) {
      return Utilities.formatTime(daypart.starttime) + ' - ' + Utilities.formatTime(daypart.endtime);
    }
  }
}
