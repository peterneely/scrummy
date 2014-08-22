'use strict';

(function () {

  var userController = ['Auth', 'User', 'Location',
    function (Auth, User, Location) {

      var self = this;

      self.logout = function () {
        Auth.logout();
        User.removeCurrentUser();
        Location.onLogout();
      };
    }];

  angular
    .module('scrummyApp')
    .controller('User', userController);
})();

