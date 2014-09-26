'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('User', UserController);

  UserController.$inject = ['State', 'User'];

  function UserController(State, User) {

    var vm = this;

    vm.logout = onLogout;

    function onLogout() {
      User.logout();
      State.go('home');
    }
  }

})();

