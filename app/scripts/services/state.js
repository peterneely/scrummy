'use strict';

(function () {

  var state = ['$location', '$state', function ($location, $state) {

    var go = function (state) {
      $state.transitionTo(state);
    };

    var isActive = function () {
      var states = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return _.contains(states, currentState()) ? 'active' : '';
    };

    var placeholder = function () {
      return dataType().slice(0, -1);
    };

    var dataType = function(){
      var currentState = currentState();
      return currentState.substr(currentState.indexOf('.') + 1);
    };

    function currentState() {
      return $state.current.name;
    }

    return {
      go: go,
      isActive: isActive,
      placeholder: placeholder,
      dataType: dataType
    };
  }];

  angular
    .module('scrummyApp')
    .factory('State', state);
})();