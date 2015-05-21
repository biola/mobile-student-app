sortObjectsBy = function(property) {
  return function(a,b) {
    if (a[property] < b[property]) { return -1; }
    if (a[property] > b[property]) { return 1; }
    return 0; // a must be equal to b
  }
}

window.Settings = {
  links: [
    {title: 'Directory', url: 'http://www.biola.edu/directory'},
    {title: 'Library', url: 'http://library.biola.edu/m'},
    {title: 'Awesome', url: 'http://google.com'},
  ].sort(sortObjectsBy('title'))
}
