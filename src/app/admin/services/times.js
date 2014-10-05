'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('AdminTimes', AdminTimesService);

  AdminTimesService.$inject = ['$modal', 'Async', 'Fn'];

  function AdminTimesService($modal, Async, Fn) {

    var _data = {};
    var _invalid = {};
    var _search = {};

    return {
      clearSearch: clearSearch,
      invalidate: invalidate,
      confirmRemove: confirmRemove,
      getSearch: getSearch,
      setSearch: setSearch,
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

    function confirmRemove(item){
      return Async.promise(confirm);

      function confirm(deferred){
        var prompt = $modal.open({
          templateUrl: 'app/admin/remove.html',
          controller: 'AdminRemove as r',
          size: 'md',
          resolve: {
            viewData: function () {
              return item;
            }
          }
        });

        prompt.result.then(function (selected) {
          deferred.resolve(selected);
        });
      }
    }

    function getSearch(){
      return _search;
    }

    function setSearch(object){
      _search = object;
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