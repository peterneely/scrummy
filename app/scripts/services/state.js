'use strict';

(function () {

  var stateService = ['$location', '$state', '$filter',
    function ($location, $state, $filter) {

      var go = function (state) {
        $state.go(state);
      };

      var isActive = function () {
        var states = ['nav.clients', 'nav.projects', 'nav.tasks'];
        return $filter('contains')(states, $state.current.name) ? 'active' : '';
      };

      return {
        go: go,
        isActive: isActive
      };
    }];

  angular
    .module('scrummyApp')
    .factory('State', stateService);
})();