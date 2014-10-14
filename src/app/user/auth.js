'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Auth', AuthController);

  AuthController.$inject = ['Config', 'Error', 'Fn', 'State', 'User'];

  function AuthController(Config, Error, Fn, State, User) {

    var vm = this;

    vm.errors = [];
    vm.focus = onFocus;
    vm.login = login;
    vm.minPasswordLength = Config.minPasswordLength;
    vm.register = register;
    vm.user = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    function login(form) {
      if (form.$valid) {
        loginUser().then(showTimes).catch(showError);
      } else {
        showValidationError(form);
      }

      function loginUser() {
        return User.login(vm.user);
      }
    }

    function onFocus() {
      vm.errors = [];
    }

    function register(form) {
      if (form.$valid) {
        cacheUserName().then(registerUser).then(createUser).then(login).catch(showError);
      } else {
        showValidationError(form);
      }

      function cacheUserName() {
        return User.cacheUserName(vm.user);
      }

      function createUser(authUser) {
        return User.create(authUser);
      }

      function registerUser() {
        return User.register(vm.user);
      }
    }

    function showError(error) {
      vm.errors.push(Error.getMessage(error));
    }

    function showTimes() {
      return State.go('nav.times');
    }

    function showValidationError(form) {
      var formErrors = form.$error;
      var errorCount = Object.keys(formErrors).length;
      if (errorCount) {
        var errorsToShow = ['required', 'email', 'minlength', 'compareTo'];
        errorsToShow.forEach(function (errorToShow) {
          var show = errorCount === 1 || errorToShow !== 'compareTo';
          if (show && Fn.has(formErrors, errorToShow)) {
            vm.errors.push(Error.getMessage({ code: errorToShow }));
          }
        });
      }
    }
  }

})();
