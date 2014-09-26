'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeUtil', TimeUtilService);

  TimeUtilService.$inject = ['$moment', 'Config', 'Fn'];

  function TimeUtilService($moment, Config, Fn) {

    return {
      dayTitle: dayTitle,
      defaultTime: defaultTime,
      elapsed: elapsed,
      format: formatDate,
      isToday: isToday,
      now: now,
      nowNoSeconds: nowNoSeconds,
      parseDate: parseDate,
      parseInput: parseInput,
      parseTime: parseTime,
      sort: sort
    };

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    }

    function defaultTime() {
      return formatDate(Date.now(), Config.timeFormat);
    }

    function elapsed(start, end) {
      var ms = $moment(end).diff($moment(start));
      return $moment(ms).format('H') + $moment(ms).format(':mm');
    }

    function formatDate(date, format) {
      return $moment(date).format(format);
    }

    function isToday(date) {
      return $moment(date).isSame($moment(new Date()), 'day');
    }

    function now() {
      return new Date();
    }

    function nowNoSeconds(){
      return new Date().setSeconds(0);
    }
    function parseDate(dateTimeString) {
      return dateTimeString.slice(0, 10);
    }

    function parseInput(value) {
      if (noTime(value)) {
        return value;
      } else if (invalidTime(value)) {
        return defaultTime();
      } else {
        return formattedTime(value);
      }

      function formattedTime(value) {
        var regex = /(?:[^:.,])+/g;
        var matched;
        var elements = [];
        while ((matched = regex.exec(value))) {
          elements.push(Fn.doubleDigits(matched[0]));
        }
        if (elements.length === 1) {
          elements.push('00');
        }
        return elements.join(':');
      }

      function invalidTime(timeString) {
        return !timeString.match(/^(?:0?[0-9]|1[0-9]|2[0-3])([:.,][0-5][0-9])?$/);
      }

      function noTime(value) {
        return value === '';
      }
    }

    function parseTime(dateTimeString) {
      return dateTimeString.slice(-5);
    }

    function sort(times) {
      return Fn.group(times, [byWeek, byDay]);

      function byDay(time) {
        var date = time.time.start;
        var dayNumber = Fn.doubleDigits(isoWeekDay(date));
        var dayString = formatDate(date, Config.dayTitleFormat);
        return dayNumber + ':' + dayString;

        function isoWeekDay(date) {
          return $moment(date).isoWeekday();
        }
      }

      function byWeek(time) {
        var date = time.time.start;
        var year = formatDate(date, 'YYYY');
        var week = Fn.doubleDigits(isoWeek(date));
        return year + '_' + week;

        function isoWeek(date) {
          return $moment(date).isoWeek();
        }
      }
    }
  }

})();