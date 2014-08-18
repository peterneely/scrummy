'use strict';

(function () {

  var navController = ['$scope', '$location', 'User',
    function ($scope, $location, User) {

      $scope.isActive = function (path) {
        return path === $location.path();
      };

      $scope.isSignedIn = function () {
        return User.getCurrentUser() ? true : false;
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();