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
        attempt(Auth.register(self.user));
      };

      self.login = function () {
        attempt(Auth.login(self.user));
      };

      function attempt(action) {
        action
          .then(function () {
            State.go('nav.timesheet');
          })
          .catch(function (error) {
            console.log(error);
            self.error = Errors.getMessage(error);
          });
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Auth', authController);
})();