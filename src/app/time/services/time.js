'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$rootScope', 'TimeClock', 'TimeForm', 'TimeResource', 'TimeUtil', 'TimeValidator'];

  function TimeService($rootScope, TimeClock, TimeForm, TimeResource, TimeUtil, TimeValidator) {

    var _timesUpdated = 'timesUpdated';

    return {
      dateTime: TimeUtil.dateTime,
      dayTitle: TimeUtil.dayTitle,
      deleteTimer: TimeResource.deleteTimer,
      defaultTime: TimeUtil.defaultTime,
      diffMilliseconds: TimeUtil.diffMilliseconds,
      elapsed: TimeUtil.elapsed,
      endAfterStart: TimeUtil.endAfterStart,
      fillOtherFields: TimeForm.fillOtherFields,
      fillSelects: TimeForm.fillSelects,
      format: TimeUtil.format,
      isToday: TimeUtil.isToday,
      isValid: TimeValidator.isValid,
      map: TimeForm.map,
      notifyTimesUpdated: notifyTimesUpdated,
      now: TimeUtil.now,
      onClockAlarm: TimeClock.onClockAlarm,
      onTimesUpdated: onTimesUpdated,
      openForm: TimeForm.openForm,
      parseDate: TimeUtil.parseDate,
      parseInput: TimeUtil.parseInput,
      parseSeconds: TimeUtil.parseSeconds,
      parseTime: TimeUtil.parseTime,
      refreshElapsed: TimeForm.refreshElapsed,
      removeTimes: TimeResource.removeTimes,
      saveNewTypes: TimeResource.saveNewTypes,
      saveState: TimeResource.saveState,
      sort: TimeUtil.sort,
      startClock: TimeClock.startClock,
      startNewTimer: TimeResource.startNewTimer,
      stopActiveTimers: TimeResource.stopActiveTimers,
      stopTimer: TimeForm.stopTimer,
      updateElapsed: TimeUtil.updateElapsed,
      updateElapsedOnForm: TimeForm.updateElapsed,
      updateTimer: TimeResource.updateTimer,
      updateTimes: TimeResource.updateTimes
    };

    function notifyTimesUpdated() {
      $rootScope.$emit(_timesUpdated);
    }

    function onTimesUpdated(callback) {
      $rootScope.$on(_timesUpdated, function () {
        callback();
      });
    }
  }

})();