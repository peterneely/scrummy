'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Auth', AuthController);

  AuthController.$inject = ['Auth', 'Data', 'Errors', 'State', 'TestData'];

  function AuthController(Auth, Data, Errors, State, TestData) {

    var vm = this;

    vm.error = null;
    vm.focus = onFocus;
    vm.login = login;
    vm.register = register;
    vm.user = TestData.user;

    function onFocus() {
      vm.error = null;
    }

    function login() {
      Auth.login(vm.user).then(function () {
        State.go('nav.times');
      }).catch(showError);
    }

    function register() {
      Auth.register(vm.user).then(function (authUser) {
        Data.createUser(authUser).then(login);
      }).catch(showError);
    }

    function showError(error) {
      vm.error = Errors.getMessage(error);
    }
  }

})();