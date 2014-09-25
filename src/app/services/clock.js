'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Clock', ClockService);

  ClockService.$inject = ['$interval', '$rootScope'];

  function ClockService($interval, $rootScope) {
    var _started = false;

    return {
      hasStarted: hasStarted,
      start: start
    };

    function hasStarted() {
      return _started;
    }

    function start() {
      _started = true;
      var count = getSeconds();
      $interval(tick, 1000);

      function getSeconds(){
        return (new Date()).getSeconds();
      }

      function tick() {
        if (count % 60 === 0) {
          $rootScope.$emit('tick');
          count = getSeconds();
        } else {
          count++;
        }
      }
    }
  }

})();