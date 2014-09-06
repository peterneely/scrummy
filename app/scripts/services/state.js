'use strict';

(function () {

  var state = ['$location', '$state', 'Filter',
    function ($location, $state, Filter) {

      var go = function (state) {
        $state.go(state);
      };

      var isActive = function () {
        var states = ['nav.clients', 'nav.projects', 'nav.tasks'];
        return Filter.contains(states, $state.current.name) ? 'active' : '';
      };

      return {
        go: go,
        isActive: isActive
      };
    }];

  angular
    .module('scrummyApp')
    .factory('State', state);
})();