'use strict';

(function () {

  var authController = ['Auth', 'User', 'Account', 'Errors', 'Location',
    function (Auth, User, Account, Errors, Location) {

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
        Auth.register(self.user).then(createAccount, fail);
      };

      self.login = function () {
        Auth.login(self.user).then(getAccount, fail);
      };

      function createAccount(authUser) {
        Account.createUser(authUser).then(self.login(), fail);
      }

      function getAccount(authUser) {
        Account.getCoreData(authUser).then(setUser, fail);
      }

      function setUser(user) {
        User.setCurrentUser(user);
        Location.go('timesheet');
      }

      function fail(error) {
        self.error = Errors.getMessage(error);
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Auth', authController);
})();