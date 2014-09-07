'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Auth', AuthController);

  AuthController.$inject = ['Auth', 'Account', 'Errors', 'State', 'TestData'];

  function AuthController(Auth, Account, Errors, State, TestData) {

    var vm = this;

    vm.error = null;
    vm.focus = onFocus;
    vm.login = login;
    vm.register = register;
    vm.user = TestData.user;

    function onFocus () {
      vm.error = null;
    }

    function login() {
      Auth.login(vm.user).then(function () {
        State.go('nav.timesheet');
      }).catch(showError);
    }

    function register () {
      Auth.register(vm.user).then(function (authUser) {
        Account.createUser(authUser).then(function () {
          vm.login();
        });
      }).catch(showError);
    }

    function showError(error) {
      vm.error = Errors.getMessage(error);
    }
  }

})();