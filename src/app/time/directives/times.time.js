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
    $scope.endTime = endTime;
    $scope.isActive = isActive;
    $scope.stopTimer = stopTimer;
    $scope.startTime = startTime;

    Time.whenClockTick(updateElapsed);

    function editTime() {
      return Time.openForm($scope.data, _item);
    }

    function end() {
      return isActive() ? now() : _end;
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

    function now() {
      return Time.nowNoSeconds();
    }

    function stopTimer() {
      Time.stopTimer(_item);
    }

    function startTime() {
      return format(_start);
    }

    function updateElapsed() {
      if (isActive()) {
        $scope.elapsed = Time.elapsed(_start, now());
      }
    }
  }
})
();