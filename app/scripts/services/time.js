'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$rootScope', '$moment', '$filter'];

  function TimeService($rootScope, $moment, $filter) {

    var _timeUpdated = 'timeUpdated';

    return {
      updated: updated,
      group: group,
      onUpdated: onUpdated
    };

    function updated() {
      $rootScope.$emit(_timeUpdated);
    }

    function group(times) {
      return nest(times, [byWeek, byDay]);

      function byDay(time) {
        return isoDay(time.time.date);
      }

      function byWeek(time) {
        return isoWeek(time.time.date);
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

    function onUpdated(callback){
      return $rootScope.$on(_timeUpdated, function(event){
        event.stopPropagation();
        callback();
      });
    }
  }

})();