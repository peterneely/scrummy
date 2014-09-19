'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('State', StateService);

  StateService.$inject = ['$rootScope', '$state', '$filter'];

  function StateService($rootScope, $state, $filter) {

    var stateName = '';

    $rootScope.$on('$stateChangeSuccess', function (event, newState) {
      stateName = newState.name;
    });

    return {
      go: go,
      tabActive: tabActive,
      whenChanged: whenChanged
    };

    function go(state) {
      $state.go(state);
    }

    function tabActive(stateName) {
      var stateNames = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return $filter('contains')(stateNames, stateName);
    }

    function whenChanged(callback) {
      $rootScope.$watch(stateChanged, function () {
        callback(stateName);
      });
    }

    function stateChanged() {
      return stateName;
    }
  }

})();