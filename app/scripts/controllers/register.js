'use strict';

(function () {

  var registerController = ['Auth', 'User', 'Errors', 'Location',
    function (Auth, User, Errors, Location) {

      var self = this;

      self.user = {
        email: 'pgneely@gmail.com',
        password: 'testing',
        confirmPassword: 'testing'
      };

      self.error = null;

      self.register = function () {

        var success = function (authUser) {
          User.setCurrentUser(authUser);
          Location.home();
        };

        var fail = function (error) {
          self.error = Errors.getMessage(error);
        };

        Auth.register(self.user).then(success, fail);
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Register', registerController);
})();