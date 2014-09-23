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

  TimeItemController.$inject = ['$scope', '$interval', '$moment'];

  function TimeItemController($scope, $interval, $moment) {
    var _item = $scope.item;

    $scope.elapsed = '';

    tick();

    function tick() {
      if ($scope.isActive) {
        var start = $moment(_item.time.start);
        getDuration();
        $interval(function () {
          getDuration();
        }, 1000);
      }

      function getDuration() {
        var ms = $moment(new Date()).diff(start);
        var d = $moment.duration(ms);
        $scope.elapsed = Math.floor(d.hours()) + $moment(ms).format(':mm');
      }
    }
  }

})();