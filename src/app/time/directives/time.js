'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('timeItem', TimeItemDirective);

  function TimeItemDirective() {
    return {
      templateUrl: '/app/time/directives/time.html',
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

    $scope.editTime = editTime;
    $scope.elapsed = elapsed;
    $scope.endTime = endTime;
    $scope.event = {};
    $scope.isActive = isActive;
    $scope.stopTimer = stopTimer;
    $scope.startTime = startTime;

    startClock();

    Time.onClockAlarm(updateElapsed);

    function editTime() {
      if (!$scope.event.selectingText && !$scope.event.stopTimer) {
        return Time.openForm($scope.data, _item);
      }
      $scope.event.stopTimer = false;
    }

    function elapsed() {
      return Time.elapsed(_item.time.start, end());

      function end() {
        return isActive() ? Time.now() : _item.time.end;
      }
    }

    function endTime() {
      return isActive() ? '' : format(_item.time.end);
    }

    function format(time) {
      return Time.format(time, Config.timeFormat);
    }

    function isActive() {
      return _item.time.end === '' || false;
    }

    function startClock() {
      if (isActive()) {
        Time.startClock(_item.time.start);
      }
    }

    function stopTimer() {
      $scope.event.stopTimer = true;
      Time.stopTimer(_item);
    }

    function startTime() {
      return format(_item.time.start);
    }

    function updateElapsed() {
      if (isActive()) {
        $scope.elapsed = Time.elapsed(_item.time.start, Time.now());
      }
    }
  }
})
();