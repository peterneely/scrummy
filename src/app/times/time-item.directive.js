'use strict';

(function(){

  angular
    .module('scrummyApp')
    .directive('timeItem', TimeItemDirective);

  function TimeItemDirective(){
    return {
      templateUrl: '/app/times/time-item.directive.html',
      scope: {
        item: '=ngModel'
      },
      controller: TimeItemController,
      replace: true
    };

    function TimeItemController($scope){
      $scope.active = active;

      function active(){
        return $scope.item.time.end === '';
      }
    }
  }
})();