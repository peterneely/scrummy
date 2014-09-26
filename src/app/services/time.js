'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$filter', '$modal', 'Fn', 'TimeResource', 'TimeUtil'];

  function TimeService($filter, $modal, Fn, TimeResource, TimeUtil) {

    return {
      dayTitle: TimeUtil.dayTitle,
      defaultTime: TimeUtil.defaultTime,
      map: map,
      openForm: openForm,
      parseDate: TimeUtil.parseDate,
      parseInput: TimeUtil.parseInput,
      parseTime: TimeUtil.parseTime,
      saveNewTypes: TimeResource.saveNewTypes,
      sort: TimeUtil.sort,
      startNewTimer: TimeResource.startNewTimer,
      stopActiveTimers: TimeResource.stopActiveTimers,
      updateTimes: TimeResource.updateTimes
    };

    function map(items) {
      var array = [];
      items.forEach(function (item) {
        array.push({
          id: item.$id,
          text: item.name
        });
      });
      return $filter('orderBy')(array, 'text');
    }

    function openForm(data, editData) {
      $modal.open({
        templateUrl: '/app/time/form.html',
        controller: 'TimeForm as tf',
        resolve: {
          viewData: function () {
            return viewData();
          }
        }
      });

      function viewData() {
        var add = angular.isUndefined(editData);
        var model = add ? data : Fn.merge(data, editData);
        model.add = add;
        return model;
      }
    }
  }

})();