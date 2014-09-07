'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('User', UserController);

  UserController.$inject = ['Auth', 'viewData'];

  function UserController(Auth) {

    var vm = this;

    vm.logout = onLogout;

    function onLogout() {
      Auth.logout();
    }
  }

})();

