'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$filter', '$modal', 'Fn', 'TimeClock', 'TimeResource', 'TimeUtil'];

  function TimeService($filter, $modal, Fn, TimeClock, TimeResource, TimeUtil) {

    return {
      dayTitle: TimeUtil.dayTitle,
      defaultTime: TimeUtil.defaultTime,
      elapsed: TimeUtil.elapsed,
      format: TimeUtil.format,
      hasClockStarted: TimeClock.hasClockStarted,
      isToday: TimeUtil.isToday,
      map: map,
      now: TimeUtil.now,
      openForm: openForm,
      parseDate: TimeUtil.parseDate,
      parseInput: TimeUtil.parseInput,
      parseTime: TimeUtil.parseTime,
      saveNewTypes: TimeResource.saveNewTypes,
      saveState: TimeResource.saveState,
      sort: TimeUtil.sort,
      startClock: TimeClock.startClock,
      startNewTimer: TimeResource.startNewTimer,
      stopActiveTimers: TimeResource.stopActiveTimers,
      stopTimer: stopTimer,
      updateTimes: TimeResource.updateTimes,
      whenClockTick: TimeClock.whenClockTick
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

    function stopTimer(item){
      TimeResource.stopTimer(item);
      TimeClock.stopClock();
    }
  }

})();