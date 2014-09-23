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

    function end() {
      if (isActive()) {
        return now();
      }
      return $moment(_item.time.end);
    }

    function now() {
      return $moment(new Date().setSeconds(0));
    }

    $scope.$on('tick', function () {
      if (isActive()) {
        $scope.elapsed = duration(now());
      }
    });

    function duration(end) {
      var ms = end.diff(_start);
      var d = $moment.duration(ms);
      return Math.floor(d.hours()) + $moment(ms).format(':mm');
    }

    function isActive() {
      return _item.time.end === '' || false;
    }
  }
})
();