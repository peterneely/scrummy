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

  TimeItemController.$inject = ['$scope', '$moment'];

  function TimeItemController($scope, $moment) {

    var _item = $scope.item;
    var _start = $moment(_item.time.start);

    $scope.isActive = isActive;
    $scope.elapsed = duration(end());
    $scope.times = times;

    $scope.$on('tick', updateElapsed);

    function duration(end) {
      var ms = end.diff(_start);
      return $moment(ms).format('H') + $moment(ms).format(':mm');
    }

    function end() {
      if (isActive()) {
        return now();
      }
      return $moment(_item.time.end);
    }

    function isActive() {
      return _item.time.end === '' || false;
      ;
    }

    function now() {
      return $moment(new Date().setSeconds(0));
    }

    function times() {
      var start = $moment(_item.time.start).format('HH:mm');
      var end = isActive() ? '' : $moment(_item.time.end).format('HH:mm');
      return start + ' - ' + end;
    }

    function updateElapsed() {
      if (isActive()) {
        $scope.elapsed = duration(now());
      }
    }
  }
})
();