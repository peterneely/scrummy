'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeClock', TimeClockService);

  TimeClockService.$inject = ['$interval', '$rootScope', 'TimeUtil'];

  function TimeClockService($interval, $rootScope, TimeUtil) {
    var _time = {};
    var _clock = {
      instance: null,
      justStarted: false,
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

      function getSeconds() {
        return TimeUtil.now().getSeconds();
      }

      function start() {
        _time.seconds = parseInt(TimeUtil.parseSeconds(startTime));
        _clock.seconds = getSeconds();
        _clock.justStarted = true;
        _clock.instance = $interval(tick, 1000);
      }

      function tick() {
        checkAlarm();
        incrementSeconds();

        function checkAlarm() {
          if (_clock.seconds === _time.seconds && !_clock.justStarted) {
            $rootScope.$emit(_clock.alarm);
          }
          _clock.justStarted = false;
        }

        function incrementSeconds() {
          _clock.seconds++;
          if (_clock.seconds === 60) {
            _clock.seconds = getSeconds();
          }
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