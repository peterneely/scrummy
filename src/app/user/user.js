'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('User', UserController);

  UserController.$inject = ['State', 'User', 'viewData'];

  function UserController(State, User, viewData) {

    var vm = this;
    vm.user = viewData;
    vm.logout = onLogout;

    function onLogout() {
      User.logout();
      State.go('home');
    }
  }

})();

