'use strict';

(function () {

  var authController = ['Auth', 'Account', 'Errors', 'State',
    function (Auth, Account, Errors, State) {

      var self = this;

      self.error = null;

      self.user = {
        email: 'pgneely@gmail.com',
        password: 'testing',
        confirmPassword: 'testing'
      };

      self.focus = function () {
        self.error = null;
      };

      self.register = function () {
        Auth.register(self.user).then(function (authUser) {
          Account.createUser(authUser).then(function () {
            self.login();
          });
        }).catch(showError);
      };

      self.login = function () {
        Auth.login(self.user).then(function () {
          State.go('nav.timesheet');
        }).catch(showError);
      };

      function showError(error) {
        self.error = Errors.getMessage(error);
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Auth', authController);
})();