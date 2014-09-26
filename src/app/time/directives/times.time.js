'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('timeItem', TimeItemDirective);

  function TimeItemDirective() {
    return {
      templateUrl: '/app/time/directives/times.time.html',
      scope: {
        data: '=scData',
        item: '=ngModel'
      },
      controller: TimeItemController,
      replace: true
    };
  }

  TimeItemController.$inject = ['$scope', 'Config', 'Time'];

  function TimeItemController($scope, Config, Time) {

    var _item = $scope.item;
    var _start = _item.time.start;
    var _end = _item.time.end;

    $scope.editTime = editTime;
    $scope.elapsed = Time.elapsed(_start, end());
    $scope.isActive = isActive;
    $scope.times = times;

    Time.whenClockTick(updateElapsed);

    function editTime() {
      return Time.openForm($scope.data, _item);
    }

    function end() {
      return isActive() ? now() : _end;
    }

    function isActive() {
      return _item.time.end === '' || false;
    }

    function now() {
      return Time.nowNoSeconds();
    }

    function times() {
      var start = format(_start);
      var end = isActive() ? '' : format(_end);
      return start + ' - ' + end;

      function format(time) {
        return Time.format(time, Config.timeFormat);
      }
    }

    function updateElapsed() {
      if (isActive()) {
        $scope.elapsed = Time.elapsed(_start, now());
      }
    }
  }
})
();