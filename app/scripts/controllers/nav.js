'use strict';

(function () {

  var navController = ['$location', 'User', 'Auth',
    function ($location, User, Auth) {

      var self = this;

      self.isActive = function (path) {
        return path === $location.path();
      };

      self.isSignedIn = function () {
        return User.getCurrentUser() ? true : false;
      };

      self.signOut = function () {
        Auth.signOut();
        User.removeCurrentUser();
        $location.path('/signin');
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();