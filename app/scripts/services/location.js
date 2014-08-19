'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var path = function () {
      return $location.path();
    };

    var is = function(key) {
      return $location.path() === URL[key];
    };

    var urlFor = function(key){
      return '#' + URL[key];
    };

    var home = function () {
      $location.path(URL.home);
    };

    var login = function () {
      $location.path(URL.login);
    };

    return {
      path: path,
      is: is,
      urlFor: urlFor,
      home: home,
      login: login
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();