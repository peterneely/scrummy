'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Times', TimesService);

  TimesService.$inject = ['Config', 'Util'];

  function TimesService(Config, Util) {

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
        var dayNumber = Util.doubleDigits(Util.isoWeekDay(date));
        var dayString = Util.format(date, Config.dayTitleFormat);
        return dayNumber + ':' + dayString;
      }

      function byWeek(time) {
        var date = time.time.start;
        var year = Util.format(date, 'YYYY');
        var isoWeek = Util.doubleDigits(Util.isoWeek(date));
        return year + '_' + isoWeek;
      }
    }
  }

})();