'use strict';

(function (){

  var registerController = ['$scope', 'Auth', 'Errors', function($scope, Auth, Errors){

    $scope.user = {
      email: 'pgneely@gmail.com',
      password: 'testing',
      confirmPassword: 'testing'
    };

    $scope.error = null;

    $scope.register = function(){

      var success = function(authUser){
        return authUser;
      };

      var fail = function(error){
        $scope.error = Errors.getMessage(error);
      };

      Auth.register($scope.user).then(success, fail);
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Register', registerController);
})();