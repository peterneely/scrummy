'use strict';

(function () {

  var navController = ['User', 'Auth', 'Location',
    function (User, Auth, Location) {

      var self = this;

      self.isActive = function (path) {
        return path === Location.path();
      };

      self.isLoggedIn = function () {
        return User.isLoggedIn();
      };

      self.logout = function () {
        Auth.logout();
        User.removeCurrentUser();
        Location.home();
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();