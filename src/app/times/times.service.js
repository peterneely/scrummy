'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Times', TimesService);

  TimesService.$inject = ['$filter', '$moment', 'Async', 'Config', 'Resource', 'Url', 'Util'];

  function TimesService($filter, $moment, Async, Config, Resource, Url, Util) {

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
        var jsDate = time.time.start;
        var dayNumber = Util.doubleDigits($moment(jsDate).isoWeekday());
        var dayString = $moment(jsDate).format(Config.dayTitleFormat);
        return dayNumber + ':' + dayString;
      }

      function byWeek(time) {
        var mDate = $moment(time.time.start);
        return mDate.year() + '_' + Util.doubleDigits(mDate.isoWeek());
      }
    }
  }

})();