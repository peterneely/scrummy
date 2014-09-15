'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$moment', '$filter'];

  function TimeService($moment, $filter) {

    return {
      daySortOrder: daySortOrder,
      defaultTime: defaultTime,
      fromInput: fromInput,
      weekSortOrder: weekSortOrder
    };

    function daySortOrder(jsDate){
      var dayNumber = $filter('doubleDigits')($moment(jsDate).isoWeekday());
      var dayTitle = $moment(jsDate).format('ddd, DD MMM YYYY');
      return dayNumber + ':' + dayTitle;
    }

    function defaultTime() {
      return $filter('date')(Date.now(), 'HH:mm');
    }

    function fromInput(value){
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

    function weekSortOrder(jsDate){
      var mDate = $moment(jsDate);
      return mDate.year() + '_' + $filter('doubleDigits')(mDate.isoWeek());
    }
  }

})();