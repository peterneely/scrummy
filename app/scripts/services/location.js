'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var path = function () {
      return $location.path();
    };

    var home = function () {
      $location.path(URL.home);
    };

    return {
      path: path,
      home: home
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();