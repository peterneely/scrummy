'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['TimeClock', 'TimeForm', 'TimeResource', 'TimeUtil'];

  function TimeService(TimeClock, TimeForm, TimeResource, TimeUtil) {

    return {
      dayTitle: TimeUtil.dayTitle,
      defaultTime: TimeUtil.defaultTime,
      elapsed: TimeUtil.elapsed,
      format: TimeUtil.format,
      isToday: TimeUtil.isToday,
      map: TimeForm.map,
      now: TimeUtil.now,
      onClockAlarm: TimeClock.onClockAlarm,
      openForm: TimeForm.openForm,
      parseDate: TimeUtil.parseDate,
      parseInput: TimeUtil.parseInput,
      parseTime: TimeUtil.parseTime,
      saveNewTypes: TimeResource.saveNewTypes,
      saveState: TimeResource.saveState,
      sort: TimeUtil.sort,
      startClock: TimeClock.startClock,
      startNewTimer: TimeResource.startNewTimer,
      stopActiveTimers: TimeResource.stopActiveTimers,
      stopTimer: TimeForm.stopTimer,
      updateTimes: TimeResource.updateTimes
    };
  }

})();