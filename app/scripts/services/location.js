'use strict';

(function () {

  var location = ['$location', 'URL', function ($location, URL) {

    var isPage = function (page) {
      return $location.path() === URL[page];
    };

    var isNotPage = function (page) {
      return $location.path() !== URL[page];
    };

    var isNotPages = function (pages) {
      return pages.every(function (page) {
        return isNotPage(page);
      });
    };

    var urlFor = function (page) {
      return '#' + URL[page];
    };

    var go = function (page) {
      $location.path(URL[page]);
    };

    return {
      isPage: isPage,
      isNotPage: isNotPage,
      isNotPages: isNotPages,
      urlFor: urlFor,
      go: go
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();