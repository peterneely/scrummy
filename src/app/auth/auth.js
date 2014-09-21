'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Auth', AuthController);

  AuthController.$inject = ['Auth', 'User', 'Errors', 'State', 'TestData'];

  function AuthController(Auth, User, Errors, State, TestData) {

    var vm = this;

    vm.error = null;
    vm.focus = onFocus;
    vm.login = login;
    vm.register = register;
    vm.user = TestData.user;

    function login() {
      Auth.login(vm.user)
        .then(showTimes)
        .catch(showError);
    }

    function onFocus() {
      vm.error = null;
    }

    function register() {
      User.cacheUserName(vm.user)
        .then(register)
        .then(createUser)
        .then(login)
        .catch(showError);

      function createUser(authUser) {
        return User.create(authUser);
      }

      function register() {
        return Auth.register(vm.user);
      }
    }

    function showError(error) {
      vm.error = Errors.getMessage(error);
    }

    function showTimes() {
      return State.go('nav.times');
    }
  }

})();