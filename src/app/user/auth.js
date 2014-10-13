'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Auth', AuthController);

  AuthController.$inject = ['Config', 'Error', 'Fn', 'State', 'User'];

  function AuthController(Config, Error, Fn, State, User) {

    var vm = this;

    vm.error = null;
    vm.focus = onFocus;
    vm.login = login;
    vm.minPasswordLength = Config.minPasswordLength;
    vm.register = register;
    vm.user = {
      email: 'test@test.com',
      pwd: 'test'
    };
    console.log(vm.user);

    function login() {
      User.login(vm.user)
        .then(showTimes)
        .catch(showError);
    }

    function onFocus() {
      vm.error = null;
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
        var keys = Object.keys(form.$error);
        if (keys.length > 0) {
          var priorities = ['required', 'email', 'compareTo', 'minlength'];
          var next = true;
          priorities.forEach(function (priority) {
            if (next && Fn.has(form.$error, priority)) {
              console.log(priority, keys);
              var error = {code: priority};
              console.log(error);
              vm.error = Error.getMessage(error);
              next = false;
            }
          });
        }
      }
    }

    function showError(error) {
      vm.error = Error.getMessage(error);
    }

    function showTimes() {
      return State.go('nav.times');
    }
  }

})();
