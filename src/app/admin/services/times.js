'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('AdminTimes', AdminTimesService);

  function AdminTimesService() {

    var _data = {};
    var _invalid = {};

    return {
      invalidate: invalidate,
      timesByType: timesByType
    };

    function invalidate(type) {
      _invalid[type] = true;
    }

    function timesByType(type, times) {
      if (shouldRefresh()) {
        return refreshed();
      } else {
        return cached();
      }

      function shouldRefresh() {
        return _invalid[type] ||
          angular.isUndefined(_invalid[type]) ||
          angular.isUndefined(_data[type])
      }

      function refreshed() {
        var grouped = _.groupBy(times, function (time) {
          return time[type].id;
        });
        _data[type] = grouped;
        _invalid[type] = false;
        return grouped;
      }

      function cached() {
        return _data[type];
      }
    }
  }

})();