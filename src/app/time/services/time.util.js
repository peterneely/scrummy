'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeUtil', TimeUtilService);

  TimeUtilService.$inject = ['$moment', 'Config', 'Fn'];

  function TimeUtilService($moment, Config, Fn) {

    return {
      dateTime: dateTime,
      dayTitle: dayTitle,
      defaultTime: defaultTime,
      elapsed: elapsed,
      endAfterStart: endAfterStart,
      format: formatDateTime,
      isToday: isToday,
      now: now,
      parseDate: parseDate,
      parseInput: parseInput,
      parseSeconds: parseSeconds,
      parseTime: parseTime,
      sort: sort
    };

    function dateTime(time, date) {
      var seconds = Fn.doubleDigits(now().getSeconds());
      return formatDateTime(date, Config.dateFormat) + ' ' + time + ':' + seconds;
    }

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    }

    function defaultTime() {
      return formatDateTime(Date.now(), Config.timeFormat);
    }

    function elapsed(start, end) {
      var ms = $moment(end).diff($moment(start));
      return $moment(ms).format('H') + $moment(ms).format(':mm');
    }

    function endAfterStart(date, startTime, endTime) {
      var start = dateTime(startTime, date);
      var end = dateTime(endTime, date);
      console.log(start, end, $moment(end).isAfter(start));
      return $moment(end).isAfter(start) || $moment(end).isSame(start);
    }

    function formatDateTime(date, format) {
      return date === '' ? '' : $moment(date).format(format);
    }

    function isToday(date) {
      return $moment(date).isSame($moment(now()), 'day');
    }

    function now() {
      return new Date();
    }

    function parseDate(dateTimeString) {
      return formatDateTime(dateTimeString, Config.dateFormat);
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

    function parseSeconds(stringDateTime) {
      return formatDateTime(stringDateTime, Config.seconds);
    }

    function parseTime(dateTimeString) {
      return formatDateTime(dateTimeString, Config.timeFormat);
    }

    function sort(times) {
      return Fn.group(times, [byWeek, byDay]);

      function byDay(time) {
        var date = time.time.start;
        var dayNumber = Fn.doubleDigits(isoWeekDay(date));
        var dayString = formatDateTime(date, Config.dayTitleFormat);
        return dayNumber + ':' + dayString;

        function isoWeekDay(date) {
          return $moment(date).isoWeekday();
        }
      }

      function byWeek(time) {
        var date = time.time.start;
        var year = formatDateTime(date, 'YYYY');
        var week = Fn.doubleDigits(isoWeek(date));
        return year + '_' + week;

        function isoWeek(date) {
          return $moment(date).isoWeek();
        }
      }
    }
  }

})();