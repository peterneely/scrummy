'use strict';

(function () {

  var state = ['$location', '$state', function ($location, $state) {

    var go = function (state) {
      $state.go(state);
    };

    var isActive = function () {
      var states = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return _.contains(states, $state.current.name) ? 'active' : '';
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