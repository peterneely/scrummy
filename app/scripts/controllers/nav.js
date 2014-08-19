'use strict';

(function () {

  var navController = ['$location', 'User', 'Auth',
    function ($location, User, Auth) {

      var self = this;

      self.isActive = function (path) {
        return path === $location.path();
      };

      self.isLoggedIn = function () {
        return User.getCurrentUser() ? true : false;
      };

      self.logout = function () {
        Auth.logout();
        User.removeCurrentUser();
        $location.path('/login');
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();