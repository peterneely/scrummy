'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeValidator', TimeValidatorService);

  TimeValidatorService.$inject = ['TimeUtil'];

  function TimeValidatorService(TimeUtil) {
    return {
      isValid: isValid
    };

    function isValid(model, isNewTime, isActive) {
      var date = model.time.date;
      var start = model.time.start;
      var end = model.time.end;
      var startExists = start !== '';
      var noEnd = end === '';

      if (isNewTime) {
        return newTimeIsValid();
      }
      return updatedTimeIsValid();

      function endAfterStart() {
        return noEnd ? true : TimeUtil.endAfterStart(date, start, end);
      }

      function hasStartAndEnd() {
        return startExists && !noEnd;
      }

      function hasStart() {
        return startExists;
      }

      function newTimeIsValid() {
        if(TimeUtil.isToday(date)){
          return testsPass([endAfterStart]);
        }
        return testsPass([endAfterStart, hasStartAndEnd]);
      }

      function testsPass(tests){
        return tests.every(function (test) {
          return test() === true;
        });
      }

      function updatedTimeIsValid() {
        if(isActive){
          return testsPass([endAfterStart, hasStart]);
        }
        return testsPass([endAfterStart, hasStartAndEnd]);
      }
    }
  }

})();