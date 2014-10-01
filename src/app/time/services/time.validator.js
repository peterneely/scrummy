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

    function isValid(model, type) {
      var date = model.date;
      var start = model.start;
      var end = model.end;
      var startExists = start !== '';
      var noEnd = end === '';

      if (type.new) {
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
        if(type.active){
          return testsPass([endAfterStart, hasStart]);
        }
        return testsPass([endAfterStart, hasStartAndEnd]);
      }
    }
  }

})();