'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['Clock', 'Resource', 'Time', 'Times', 'viewData'];

  function TimesController(Clock, Resource, Time, Times, viewData) {
    console.log(viewData);

    var _times = sortTimes();

    startClock();
    watchTimes();

    var vm = this;
    vm.addTime = addTime;
    vm.days = days;
    vm.dayTitle = dayTitle;
    vm.times = times;
    vm.viewData = viewData;
    vm.weeks = weeks;

    function addTime() {
      return Time.openTimeForm(viewData);
    }

    function days(week) {
      return keys(_times[week]);
    }

    function dayTitle(dayHeader) {
      return Times.dayTitle(dayHeader);
    }

    function keys(obj) {
      return mostRecentFirst(Object.keys(obj));
    }

    function mostRecentFirst(collection) {
      return _.sortBy(collection).reverse();
    }

    function sortTimes() {
      return Time.group(viewData.times, [byWeek, byDay]);

      function byDay(time) {
        return Times.daySortOrder(time.time.start);
      }

      function byWeek(time) {
        return Times.weekSortOrder(time.time.start);
      }
    }

    function startClock() {
      if (!Clock.hasStarted()) {
        Clock.start();
      }
    }

    function times(week, day) {
      return mostRecentFirst(_times[week][day]);
    }

    function watchTimes() {
      Resource.watch(viewData.times, function () {
        _times = sortTimes();
      });
    }

    function weeks() {
      return keys(_times);
    }
  }

})();