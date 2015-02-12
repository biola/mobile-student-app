formatDate = function(date) {
  date = new Date(date)
  return date.toDateString() + " @ " + date.toLocaleTimeString();
}
