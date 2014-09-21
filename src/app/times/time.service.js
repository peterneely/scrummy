'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$moment', '$filter', 'Config'];

  function TimeService($moment, $filter, Config) {

    return {
      daySortOrder: daySortOrder,
      defaultTime: defaultTime,
      duration: duration,
      end: end,
      fromInput: fromInput,
      group: group,
      isToday: isToday,
      start: start,
      weekSortOrder: weekSortOrder
    };

    function dateTime(time, date) {
      if (time === undefined) {
        return '';
      }
      return $filter('date')(date, Config.dateFormat) + ' ' + time;
    }

    function daySortOrder(jsDate) {
      var dayNumber = $filter('doubleDigits')($moment(jsDate).isoWeekday());
      var dayTitle = $moment(jsDate).format('ddd, DD MMM YYYY');
      return dayNumber + ':' + dayTitle;
    }

    function defaultTime() {
      return $filter('date')(Date.now(), 'HH:mm');
    }

    function duration(time) {
      var end;
      if (time.time.end === '') {
        var startDate = $filter('date')(new Date(time.time.start), Config.dateFormat);
        var currentTime = $filter('date')(Date.now(), Config.timeFormat);
        var endDateTime = startDate + ' ' + currentTime;
        end = $moment(endDateTime);
      } else {
        end = $moment(time.time.end);
      }
      var start = $moment(time.time.start);
      var span = '';
      try {
        span = end.diff(start, 'hours') + ':' + $filter('doubleDigits')(end.diff(start, 'minutes'));
      } catch (error) {
      }
      return span.replace('NaN:aN', '0:00');
    }

    function end(time) {
      return dateTime(time.end, time.date);
    }

    function fromInput(value) {
      if (noTime(value)) {
        return value;
      } else if (invalidTime(value)) {
        return defaultTime();
      } else {
        return formattedTime(value);
      }

      function formattedTime(value) {
        return $filter('formatTime')(value);
      }

      function invalidTime(value) {
        return !$filter('validTime')(value);
      }

      function noTime(value) {
        return value === '';
      }
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

    function isToday(date) {
      return $moment(date).isSame($moment(Date.now()), 'day');
    }

    function start(time) {
      return dateTime(time.start || defaultTime(), time.date);
    }

    function weekSortOrder(jsDate) {
      var mDate = $moment(jsDate);
      return mDate.year() + '_' + $filter('doubleDigits')(mDate.isoWeek());
    }
  }

})();