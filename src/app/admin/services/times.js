'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('AdminTimes', AdminTimesService);

  AdminTimesService.$inject = ['Fn'];

  function AdminTimesService(Fn) {

    var _data = {};
    var _invalid = {};
    var _search = {};

    return {
      clearSearch: clearSearch,
      invalidate: invalidate,
      search: search,
      timesByType: timesByType
    };

    function clearSearch() {
      _search = {};
    }

    function invalidate() {
      for (var type in _data) {
        if (_data.hasOwnProperty(type)) {
          _invalid[type] = true;
        }
      }
    }

    function search(){
      return _search;
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
          angular.isUndefined(_data[type]);
      }

      function refreshed() {
        var grouped = Fn.groupBy(times, function (time) {
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