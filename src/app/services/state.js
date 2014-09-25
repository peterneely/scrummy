'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('State', StateService);

  StateService.$inject = ['$rootScope', '$state', 'Util'];

  function StateService($rootScope, $state, Util) {

    var _stateName = '';

    $rootScope.$on('$stateChangeSuccess', function (event, newState) {
      _stateName = newState.name;
    });

    return {
      go: go,
      isAdmin: isAdmin,
      whenChanged: whenChanged
    };

    function go(state) {
      $state.go(state);
    }

    function isAdmin(stateName) {
      var stateNames = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return Util.array.contains(stateNames, stateName);
    }

    function whenChanged(callback) {
      $rootScope.$watch(stateChanged, function () {
        callback(_stateName);
      });
    }

    function stateChanged() {
      return _stateName;
    }
  }

})();