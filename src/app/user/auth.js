'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Auth', AuthController);

  AuthController.$inject = ['Config', 'Error', 'State', 'User'];

  function AuthController(Config, Error, State, User) {

    var vm = this;

    vm.clearErrors = clearErrors;
    vm.errors = [];
    vm.login = login;
    vm.minPasswordLength = Config.minPasswordLength;
    vm.register = register;
    vm.user = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    function clearErrors() {
      vm.errors = [];
    }

    function handleServerError(error) {
      User.clearUserName();
      clearErrors();
      vm.errors.push(Error.getMessage(error));
    }

    function handleValidationErrors(form) {
      clearErrors();
      vm.errors = Error.getMessages(form);
    }

    function login(form) {
      if (form.$valid) {
        loginUser().then(showTimes).catch(handleServerError);
      } else {
        handleValidationErrors(form);
      }

      function loginUser() {
        return User.login(vm.user);
      }
    }

    function register(form) {
      if (form.$valid) {
        cacheUserName().then(registerUser).then(createUser).then(login).catch(handleServerError);
      } else {
        handleValidationErrors(form);
      }

      function cacheUserName() {
        return User.cacheUserName(vm.user);
      }

      function createUser(authUser) {
        return User.create(authUser, form);
      }

      function registerUser() {
        return User.register(vm.user);
      }
    }

    function showTimes() {
      return State.go('nav.times');
    }
  }

})();
