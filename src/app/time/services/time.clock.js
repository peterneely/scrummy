'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeClock', TimeClockService);

  TimeClockService.$inject = ['$interval', '$rootScope'];

  function TimeClockService($interval, $rootScope) {
    var _started = false;
    var _tickEvent = 'tick';

    return {
      hasClockStarted: hasClockStarted,
      startClock: startClock,
      whenClockTick: whenClockTick
    };

    function hasClockStarted() {
      return _started;
    }

    function startClock() {
      _started = true;
      var count = getSeconds();
      $interval(tick, 1000);

      function getSeconds(){
        return (new Date()).getSeconds();
      }

      function tick() {
        if (count % 60 === 0) {
          $rootScope.$emit(_tickEvent);
          count = getSeconds();
        } else {
          count++;
        }
      }
    }

    function whenClockTick(callback){
      $rootScope.$on(_tickEvent, function(event){
        event.stopPropagation();
        callback();
      });
    }
  }

})();