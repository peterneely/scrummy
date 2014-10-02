'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeClock', TimeClockService);

  TimeClockService.$inject = ['$interval', '$rootScope', '$timeout', 'TimeUtil'];

  function TimeClockService($interval, $rootScope, $timeout, TimeUtil) {
    var _time = {};
    var _clock = {
      instance: null,
      alarm: 'alarm'
    };

    return {
      startClock: startClock,
      stopClock: stopClock,
      onClockAlarm: onClockAlarm
    };

    function startClock(startTime) {
      if (!started()) {
        start();
      }

      function start() {
        _time.seconds = parseInt(TimeUtil.parseSeconds(startTime));
        _clock.seconds = TimeUtil.now().getSeconds();
        _time.diff = TimeUtil.diffMilliseconds(_time.seconds, _clock.seconds);
        $timeout(alarm, _time.diff).then(tickEveryMinute);

        function alarm() {
          $rootScope.$emit(_clock.alarm);
        }

        function tickEveryMinute(){
          _clock.instance = $interval(alarm, 60000, false);
        }
      }
    }

    function started() {
      return _clock.instance !== null;
    }

    function stopClock() {
      if (started()) {
        $interval.cancel(_clock.instance);
        _clock.instance = null;
      }
    }

    function onClockAlarm(callback) {
      $rootScope.$on(_clock.alarm, function () {
        callback();
      });
    }
  }

})();