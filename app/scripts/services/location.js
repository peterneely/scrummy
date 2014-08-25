'use strict';

(function () {

  var location = ['$location', '$state', 'URL',
    function ($location, $state, URL) {

      var urlFor = function (page) {
        return '#' + URL[page];
      };

      var go = function (page) {
        $location.path(URL[page]);
      };

      var isActive = function () {
        var activeStates = ['clients', 'projects', 'tasks'];
        var isActive = activeStates.indexOf($state.current.name) > -1;
        return isActive ? 'active' : '';
      };

      var data = function () {
        return $state.current.data;
      };

      var onLogout = function () {
        go('home');
      };

      return {
        urlFor: urlFor,
        go: go,
        isActive: isActive,
        data: data,
        onLogout: onLogout
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();