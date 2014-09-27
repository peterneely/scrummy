'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeClock', TimeClockService);

  TimeClockService.$inject = ['$interval', '$rootScope', 'TimeUtil'];

  function TimeClockService($interval, $rootScope, TimeUtil) {
    var _clock = null;
    var _clockJustStarted = false;
    var _tickEvent = 'tick';

    return {
      startClock: startClock,
      stopClock: stopClock,
      whenClockTick: whenClockTick
    };

    function clockStarted() {
      return _clock !== null;
    }

    function startClock(startTime) {
      if (!clockStarted()) {
        var seconds = parseInt(TimeUtil.parseSeconds(startTime));
        var counter = resetCounter();
        _clockJustStarted = true;
        _clock = $interval(tick, 1000);
      }

      function resetCounter(){
        return TimeUtil.now().getSeconds();
      }

      function tick() {
        console.log(counter, seconds);
        if(counter === seconds && !_clockJustStarted) {
          console.log('tick');
          $rootScope.$emit(_tickEvent);
        }
        _clockJustStarted = false;
        counter++;
        if(counter === 60){
          counter = resetCounter();
        }
      }
    }

    function stopClock() {
      if (clockStarted()) {
        $interval.cancel(_clock);
        _clock = null;
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