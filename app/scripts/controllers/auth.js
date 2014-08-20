'use strict';

(function () {

  var authController = ['Auth', 'User', 'Errors', 'Location',
    function (Auth, User, Errors, Location) {

      var self = this;

      self.error = null;

      self.user = {
        email: 'pgneely@gmail.com',
        password: 'testing',
        confirmPassword: 'testing'
      };

      self.urlFor = function (key) {
        return Location.urlFor(key);
      };

      self.focus = function () {
        self.error = null;
      };

      self.register = function () {
        Auth.register(self.user).then(success, fail);
      };

      self.login = function () {
        Auth.login(self.user).then(success, fail);
      };

      function success(authUser) {
        User.setCurrentUser(authUser);
        Location.navigateTo('timesheet');
      }

      function fail(error) {
        self.error = Errors.getMessage(error);
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Auth', authController);
})();