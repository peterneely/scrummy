'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('State', StateService);

  StateService.$inject = ['$rootScope', '$state', '$filter'];

  function StateService($rootScope, $state, $filter) {

    $rootScope.$on('$stateChangeSuccess', notifyCurrentState);

    return {
      go: go
    };

    function go(state) {
      $state.go(state);
    }

    function isManage(stateName) {
      var stateNames = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return $filter('contains')(stateNames, stateName) ? 'active' : '';
    }

    function notifyCurrentState(event, toState) {
      $rootScope.$emit('isManage', isManage(toState.name));
    }
  }

})();