'use strict';

(function () {

  var registerController = ['$location', 'Auth', 'User', 'Errors',
    function ($location, Auth, User, Errors) {

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
          $location.path('/');
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