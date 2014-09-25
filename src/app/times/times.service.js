'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Times', TimesService);

  TimesService.$inject = ['Config', 'Date', 'String'];

  function TimesService(Config, Date, String) {

    return {
      dayTitle: dayTitle,
      group: group,
      sort: sort
    };

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    }

    function group(seq, keys) {
      if (!keys.length) {
        return seq;
      }
      var first = keys[0];
      var rest = keys.slice(1);
      return _.mapValues(_.groupBy(seq, first), function (value) {
        return group(value, rest);
      });
    }

    function sort(times) {
      return group(times, [byWeek, byDay]);

      function byDay(time) {
        var date = time.time.start;
        var dayNumber = String.doubleDigits(Date.isoWeekDay(date));
        var dayString = Date.format(date, Config.dayTitleFormat);
        return dayNumber + ':' + dayString;
      }

      function byWeek(time) {
        var date = time.time.start;
        var year = Date.format(date, 'YYYY');
        var isoWeek = String.doubleDigits(Date.isoWeek(date));
        return year + '_' + isoWeek;
      }
    }
  }

})();