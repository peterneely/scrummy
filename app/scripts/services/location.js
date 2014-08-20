'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var path = function () {
      return $location.path();
    };

    var is = function (page) {
      return $location.path() === URL[page];
    };

    var isNotPage = function (page) {
      return $location.path() !== URL[page];
    };

    var isNotPages = function (pages) {
      var notPage = function (page) {
        return isNotPage(page);
      };
      return pages.every(notPage);
    };

    var urlFor = function (page) {
      return '#' + URL[page];
    };

    var navigateTo = function (page) {
      $location.path(URL[page]);
    };

    return {
      path: path,
      is: is,
      isNotPage: isNotPage,
      isNotPages: isNotPages,
      urlFor: urlFor,
      navigateTo: navigateTo
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();