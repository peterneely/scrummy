'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Times', TimesService);

  TimesService.$inject = ['Config', 'Fn'];

  function TimesService(Config, Fn) {

    return {
      dayTitle: dayTitle,
      sort: sort
    };

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
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