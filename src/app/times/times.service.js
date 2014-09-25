'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Times', TimesService);

  TimesService.$inject = ['Util', 'Config', 'Date', 'String'];

  function TimesService(Util, Config, Date, String) {

    return {
      dayTitle: dayTitle,
      sort: sort
    };

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    }

    function sort(times) {
      return Util.group(times, [byWeek, byDay]);

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