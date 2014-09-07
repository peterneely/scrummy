'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('State', StateService);

  StateService.$inject = ['$state', '$filter'];

  function StateService($state, $filter) {

    return {
      go: go,
      isActive: isActive
    };

    function go(state) {
      $state.go(state);
    }

    function isActive() {
      var states = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return $filter('contains')(states, $state.current.name) ? 'active' : '';
    }
  }

})();