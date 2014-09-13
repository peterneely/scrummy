'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$moment', '$filter'];

  function TimeService($moment, $filter) {

    return {
      group: group
    };

    function group(times) {
      return nest(times, [byWeek, byDay]);

      function byWeek (time) {
        return isoWeek(time.time.date);
      }

      function byDay(time) {
        return isoDay(time.time.date);
      }
    }

    function isoDay(jsDate) {
      return $filter('doubleDigits')($moment(jsDate).isoWeekday());
    }

    function isoWeek(jsDate) {
      var mDate = $moment(jsDate);
      return mDate.year() + '_' + $filter('doubleDigits')(mDate.isoWeek());
    }

    function nest(seq, keys) {
      if (!keys.length) {
        return seq;
      }
      var first = keys[0];
      var rest = keys.slice(1);
      return _.mapValues(_.groupBy(seq, first), function (value) {
        return nest(value, rest);
      });
    }
  }

})();