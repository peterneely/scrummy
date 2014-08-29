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
        Auth.register(self.user).then(function(){
          Location.go('timesheet');
        });
      };

      self.login = function () {
        Auth.login(self.user).then(function(){
          Location.go('timesheet');
        });
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Auth', authController);
})();