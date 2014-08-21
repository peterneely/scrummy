'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var urlFor = function (page) {
      return '#' + URL[page];
    };

    var go = function (page) {
      $location.path(URL[page]);
    };

    return {
      urlFor: urlFor,
      go: go
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();