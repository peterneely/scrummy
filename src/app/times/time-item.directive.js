'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('timeItem', TimeItemDirective);

  function TimeItemDirective() {
    return {
      templateUrl: '/app/times/time-item.directive.html',
      scope: {
        item: '=ngModel',
        isActive: '='
      },
      controller: TimeItemController,
      replace: true
    };
  }

  TimeItemController.$inject = ['$scope', '$interval', 'Resource', 'Url'];

  function TimeItemController($scope, $interval, Resource, Url) {
    var _item = $scope.item;

    tick();

    function tick() {
      if ($scope.isActive) {
        $scope.elapsed = _item.time.elapsed || 0;
//        $interval(increment(elapsed), 5000);
        $interval(function(){
          $scope.elapsed++;
//          Resource.put(Url.time(_item.$id), {elapsed: $scope.elapsed});
        }, 5000);
      }

      function increment(elapsed) {
        console.log('tick');
        elapsed++;
        Resource.put(Url.time(_item.$id), {elapsed: elapsed});
        $scope.elapsed = elapsed;
//        console.log(elapsed);
      }
    }
  }

})();