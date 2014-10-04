'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('State', StateService);

  StateService.$inject = ['$rootScope', '$state', 'Async', 'Fn', 'Resource', 'Url'];

  function StateService($rootScope, $state, Async, Fn, Resource, Url) {

    var _defaultAdmin = '';
    var _stateName = '';

    $rootScope.$on('$stateChangeSuccess', function (event, newState) {
      _stateName = newState.name;
    });

    return {
      current: current,
      getDefaultAdmin: getDefaultAdmin,
      go: go,
      isAdmin: isAdmin,
      saveDefaultAdmin: saveDefaultAdmin,
      whenChanged: whenChanged
    };

    function current() {
      if(_stateName === ''){
        _stateName = $state.current.name;
      }
      return _stateName;
    }

    function getDefaultAdmin() {
      return Async.promise(getDefault);

      function getDefault(deferred) {
        if (_defaultAdmin === '') {
          Resource.get(Url.userStateAdmin()).then(function (data) {
            var state = Resource.exists(data) ? data.state : 'nav.clients';
            deferred.resolve(state);
          });
        } else {
          deferred.resolve(_defaultAdmin);
        }
      }
    }

    function go(state) {
      $state.go(state);
    }

    function isAdmin(stateName) {
      var stateNames = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return Fn.contains(stateNames, stateName);
    }

    function saveDefaultAdmin() {
      _defaultAdmin = _stateName;
      Resource.put(Url.userStateAdmin(), {state: _defaultAdmin});
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