'use strict';

(function(){

  var Login = function($scope){
    $scope.error = false;
  };

  angular.module('scrummyApp').controller('LoginCtrl', Login);
})();