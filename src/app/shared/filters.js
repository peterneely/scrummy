'use strict';

(function () {

  angular
    .module('scrummyApp')
    .filter('timeFormat', timeFormat);

  timeFormat.$inject = ['$filter', '$moment'];

  function timeFormat($filter, $moment) {
    return function (milliseconds, isDecimal) {
      var duration = $moment.duration(milliseconds);
      return isDecimal ? decimal(duration) : hoursMinutes(duration);
    };

    function decimal(duration) {
      var hours = duration.hours();
      var minutes = duration.minutes();
      var decimalTime = hours + (minutes / 60);
      return $filter('number')(decimalTime, 2) + 'h';
    }

    function hoursMinutes(duration) {
      return duration.hours() + 'h ' + duration.minutes() + 'm';
    }
  }

})();
