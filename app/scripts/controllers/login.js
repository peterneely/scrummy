'use strict';

(function () {

  var loginController = ['Auth', 'User', 'Errors', 'Location',
    function (Auth, User, Errors, Location) {

      var self = this;

      self.user = {
        email: 'pgneely@gmail.com',
        password: 'testing'
      };

      self.error = null;

      self.login = function () {

        var success = function (authUser) {
          User.setCurrentUser(authUser);
          Location.home();
        };

        var fail = function (error) {
          self.error = Errors.getMessage(error);
        };

        Auth.login(self.user).then(success, fail);
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Login', loginController);
})();