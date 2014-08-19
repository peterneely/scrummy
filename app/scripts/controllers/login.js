'use strict';

(function () {

  var loginController = ['$location', 'Auth', 'User', 'Errors',
    function ($location, Auth, User, Errors) {

      var self = this;

      self.user = {
        email: 'pgneely@gmail.com',
        password: 'testing'
      };

      self.error = null;

      self.login = function () {

        var success = function (authUser) {
          User.setCurrentUser(authUser);
          $location.path('/');
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