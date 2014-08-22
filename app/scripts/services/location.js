'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var defaultNavButton = 'timesheet';
    var selectedNavButton = defaultNavButton;

    var urlFor = function (page) {
      return '#' + URL[page];
    };

    var go = function (page) {
      $location.path(URL[page]);
    };

    var onLogout = function(){
      go('home');
      selectedNavButton = defaultNavButton;
    };

    return {
      urlFor: urlFor,
      go: go,
      onLogout: onLogout,
      selectedNavButton: selectedNavButton
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();