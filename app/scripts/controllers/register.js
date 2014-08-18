'use strict';

(function () {

  var registerController = ['$rootScope', '$scope', '$location', 'Auth', 'User', 'Errors',
    function ($rootScope, $scope, $location, Auth, User, Errors) {

      $scope.user = {
        email: 'pgneely@gmail.com',
        password: 'testing',
        confirmPassword: 'testing'
      };

      $scope.error = '';

      $scope.register = function () {

        var success = function (authUser) {
          User.setCurrentUser(authUser);
          $location.path('/');
        };

        var fail = function (error) {
          $scope.error = Errors.getMessage(error);
        };

        Auth.register($scope.user).then(success, fail);
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Register', registerController);
})();