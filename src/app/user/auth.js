'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Auth', AuthController);

  AuthController.$inject = ['Error', 'Fn', 'State', 'User'];

  function AuthController(Error, Fn, State, User) {

    var vm = this;

    vm.errors = [];
    vm.focus = onFocus;
    vm.login = login;
    vm.register = register;
    vm.user = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    function login() {
      User.login(vm.user)
        .then(showTimes)
        .catch(showError);
    }

    function onFocus() {
      vm.errors = [];
    }

    function register(form) {
      if (form.$valid) {
        cacheUserName().then(registerUser).then(createUser).then(login).catch(showError);
      } else {
        showValidationError();
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

      function showValidationError() {
        var formErrors = form.$error;
        var keys = Object.keys(formErrors);
        if (keys.length > 0) {
          var errorsToShow = ['required', 'email', 'minlength', 'compareTo'];
          errorsToShow.forEach(function (errorToShow) {
            var next = keys.length === 1 || errorToShow !== 'compareTo';
            if (next && Fn.has(formErrors, errorToShow)) {
              vm.errors.push(Error.getMessage({ code: errorToShow }));
            }
          });
        }
      }
    }

    function showError(error) {
      vm.errors.push(Error.getMessage(error));
    }

    function showTimes() {
      return State.go('nav.times');
    }
  }

})();
