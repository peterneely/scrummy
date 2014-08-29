'use strict';

(function () {

  var authController = ['Auth', 'Account', 'Errors', 'Location',
    function (Auth, Account, Errors, Location) {

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

      self.cancel = function () {
        Location.go('home');
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
            Location.go('timesheet');
          })
          .catch(function (error) {
            self.error = Errors.getMessage(error);
          });
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Auth', authController);
})();