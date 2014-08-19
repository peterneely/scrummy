'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var path = function () {
      return $location.path();
    };

    var home = function () {
      $location.path(URL.home);
    };

    var login = function () {
      $location.path(URL.login);
    };

    return {
      path: path,
      home: home,
      login: login
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();