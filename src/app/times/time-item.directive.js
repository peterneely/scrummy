'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('timeItem', TimeItemDirective);

  function TimeItemDirective() {
    return {
      templateUrl: '/app/times/time-item.directive.html',
      scope: {
        data: '=scData',
        item: '=ngModel'
      },
      controller: TimeItemController,
      replace: true
    };
  }

  TimeItemController.$inject = ['$scope', 'Clock', 'Config', 'TimeForm', 'Util'];

  function TimeItemController($scope, Clock, Config, TimeForm, Util) {

    var _item = $scope.item;
    var _start = _item.time.start;
    var _end = _item.time.end;

    $scope.editTime = editTime;
    $scope.elapsed = Util.elapsed(_start, end());
    $scope.isActive = isActive;
    $scope.times = times;

    Clock.whenTick(updateElapsed);

    function editTime() {
      return TimeForm.open($scope.data, _item);
    }

    function end() {
      return isActive() ? now() : _end;
    }

    function isActive() {
      return _item.time.end === '' || false;
    }

    function now() {
      return Util.nowNoSeconds();
    }

    function times() {
      var start = format(_start);
      var end = isActive() ? '' : format(_end);
      return start + ' - ' + end;

      function format(time) {
        return Util.format(time, Config.timeFormat);
      }
    }

    function updateElapsed() {
      if (isActive()) {
        $scope.elapsed = Util.elapsed(_start, now());
      }
    }
  }
})
();