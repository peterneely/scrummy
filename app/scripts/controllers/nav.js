'use strict';

(function () {

  var navController = ['$location', 'User', function ($location, User) {

      var self = this;

      self.isActive = function (path) {
        return path === $location.path();
      };

      self.isSignedIn = function () {
        return User.getCurrentUser() ? true : false;
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();