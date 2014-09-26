'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeUtil', TimeUtilService);

  TimeUtilService.$inject = ['Config', 'Fn'];

  function TimeUtilService(Config, Fn) {

    return {
      dayTitle: dayTitle,
      defaultTime: defaultTime,
      parseDate: parseDate,
      parseInput: parseInput,
      parseTime: parseTime,
      sort: sort
    };

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    }

    function defaultTime() {
      return Fn.format(Date.now(), Config.timeFormat);
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
        var dayNumber = Fn.doubleDigits(Fn.isoWeekDay(date));
        var dayString = Fn.format(date, Config.dayTitleFormat);
        return dayNumber + ':' + dayString;
      }

      function byWeek(time) {
        var date = time.time.start;
        var year = Fn.format(date, 'YYYY');
        var isoWeek = Fn.doubleDigits(Fn.isoWeek(date));
        return year + '_' + isoWeek;
      }
    }
  }

})();