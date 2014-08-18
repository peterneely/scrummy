'use strict';

(function(){

  var loginController = function($scope){
    $scope.error = false;
  };

  angular.module('scrummyApp').controller('Login', loginController);
})();