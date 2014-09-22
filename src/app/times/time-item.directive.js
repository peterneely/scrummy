'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('timeItem', TimeItemDirective);

  function TimeItemDirective() {
    return {
      templateUrl: '/app/times/time-item.directive.html',
      scope: {
        item: '=ngModel'
      },
      controller: TimeItemController,
      replace: true
    };
  }

  TimeItemController.$inject = ['$scope', '$interval', 'Resource', 'Url'];

  function TimeItemController($scope, $interval, Resource, Url) {
    var _item = $scope.item;

    $scope.isActive = isActive();

    tick();

    function isActive() {
      return _item.time.end === '';
    }

    function tick() {
      if ($scope.isActive) {
        var elapsed = _item.time.elapsed || 0;
        $interval(increment(elapsed), 5000);
      }

      function increment(elapsed) {
        elapsed++;
        Resource.put(Url.time(_item.$id), {elapsed: elapsed});
        console.log(elapsed);
      }
    }
  }

})();