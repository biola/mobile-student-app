window.Helpers = {
  chapel: {
    formatDate: function(date) {
      date = new Date(date);
      return moment(date).format("dddd, MMM D, YYYY @ h:mma");
    },
    formatSpeakers: function(speakers) {
      return speakers.map(function(s){ return s.name; }).join(', ');
    }
  },

  cafe: {
    formatTime: function(daypart) {
      return Utilities.format24HourTimeString(daypart.starttime) + ' - ' + Utilities.format24HourTimeString(daypart.endtime);
    }
  }
}
