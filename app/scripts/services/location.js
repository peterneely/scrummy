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

      var isActive = function(){
        var activeStates = ['settings.clients', 'settings.projects', 'settings.tasks'];
        var isActive = activeStates.indexOf($state.current.name) > -1;
        return isActive ? 'active' : '';
      };

      var onLogout = function () {
        go('home');
      };

      return {
        urlFor: urlFor,
        go: go,
        isActive: isActive,
        onLogout: onLogout
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();