'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Timer', TimerService);

  TimerService.$inject = ['$rootScope', '$interval'];

  function TimerService($rootScope, $interval) {
    var _count = 0;
    var _started = false;

    return {
      hasStarted: hasStarted,
      reset: reset,
      start: start
    };

    function hasStarted() {
      return _started;
    }

    function reset() {
      _count = 0;
    }

    function start() {
      _started = true;
      $interval(function () {
        _count++;
        if (tick()) {
//          console.log(_count);
          $rootScope.$broadcast('tick', _count);
        }
      }, 1000);

      function tick() {
        return _count % 60 === 0;
      }
    }
  }
})();