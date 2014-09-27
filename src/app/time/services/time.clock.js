'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeClock', TimeClockService);

  TimeClockService.$inject = ['$interval', '$rootScope'];

  function TimeClockService($interval, $rootScope) {
    var _clock = null;
    var _started = false;
    var _tickEvent = 'tick';

    return {
      hasClockStarted: hasClockStarted,
      startClock: startClock,
      stopClock: stopClock,
      whenClockTick: whenClockTick
    };

    function hasClockStarted() {
      return _started;
    }

    function startClock() {
      _started = true;
      _clock = $interval(tick, 60000);

      function tick() {
        $rootScope.$emit(_tickEvent);
      }
    }

    function stopClock() {
      if (_clock) {
        $interval.cancel(_clock);
      }
    }

    function whenClockTick(callback) {
      $rootScope.$on(_tickEvent, function (event) {
        event.stopPropagation();
        callback();
      });
    }
  }

})();