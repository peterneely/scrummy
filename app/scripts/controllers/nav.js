'use strict';

(function () {

  var navController = ['$location', 'User', 'Auth',
    function ($location, User, Auth) {

      var self = this;

      self.isActive = function (path) {
        return path === $location.path();
      };

      self.isLoggedIn = function () {
        return User.isLoggedIn();
      };

      self.logout = function () {
        Auth.logout();
        User.removeCurrentUser();
        $location.path('/');
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();