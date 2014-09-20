'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('User', UserController);

  UserController.$inject = ['Auth', 'State'];

  function UserController(Auth, State) {

    var vm = this;

    vm.logout = onLogout;

    function onLogout() {
      Auth.logout();
      State.go('home');
    }
  }

})();

