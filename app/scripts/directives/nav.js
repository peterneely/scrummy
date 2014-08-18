'use strict';

(function(){

  var navDirective = function (){

    var controller = ['$scope', '$location', function($scope, $location){
      $scope.isActive = function(path){
        return path === $location.path();
      };
    }];

    return {
      restrict: 'A',
      templateUrl: 'views/nav.html',
      controller: controller
    };
  };

  angular
    .module('scrummyApp')
    .directive('scrummyNav', navDirective);
})();

