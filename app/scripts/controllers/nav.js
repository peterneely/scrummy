'use strict';

(function () {

  var navController = ['$scope', '$location', function($scope, $location){
    $scope.isActive = function(path){
      return path === $location.path();
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();