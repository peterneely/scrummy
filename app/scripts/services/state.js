'use strict';

(function () {

  var state = ['$location', '$state', function ($location, $state) {

    var goto = function (state) {
      $state.transitionTo(state);
    };

    var isActive = function () {
      var states = ['nav.clients', 'nav.projects', 'nav.tasks'];
      return _.contains(states, currentState()) ? 'active' : '';
    };

    var placeholder = function () {
      return $state.current.data.placeholder;
    };

    function currentState() {
      return $state.current.name;
    }

    return {
      goto: goto,
      isActive: isActive,
      placeholder: placeholder
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Location', state);
})();