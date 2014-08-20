'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var path = function () {
      return $location.path();
    };

    var is = function (key) {
      return $location.path() === URL[key];
    };

    var urlFor = function (key) {
      return '#' + URL[key];
    };

    var navigateTo = function (key) {
      $location.path(URL[key]);
    };

    return {
      path: path,
      is: is,
      urlFor: urlFor,
      navigateTo: navigateTo
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();