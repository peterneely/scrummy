'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Date', DateService);

  DateService.$inject = ['$moment'];

  function DateService($moment) {

    return {
      elapsed: elapsed,
      format: formatDate,
      isToday: isToday,
      isoWeek: isoWeek,
      isoWeekDay: isoWeekDay,
      now: now,
      nowNoSeconds: nowNoSeconds
    };

    function elapsed(start, end) {
      var ms = $moment(end).diff($moment(start));
      return $moment(ms).format('H') + $moment(ms).format(':mm');
    }

    function formatDate(date, format){
      return $moment(date).format(format);
    }

    function isoWeek(date){
      return $moment(date).isoWeek();
    }

    function isoWeekDay(date){
      return $moment(date).isoWeekday();
    }

    function isToday(date) {
      return $moment(date).isSame($moment(new Date()), 'day');
    }

    function now(){
      return new Date();
    }

    function nowNoSeconds(){
      return new Date().setSeconds(0);
    }
  }

})();