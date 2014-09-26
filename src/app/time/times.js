'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['Fn', 'Resource', 'Time', 'viewData'];

  function TimesController(Fn, Resource, Time, viewData) {
//    console.log(viewData);

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
      return Time.openForm(viewData);
    }

    function days(week) {
      return keys(_times[week]);
    }

    function dayTitle(dayHeader) {
      return Time.dayTitle(dayHeader);
    }

    function keys(obj) {
      return Fn.sortDesc(Object.keys(obj));
    }

    function sortTimes(){
      return Time.sort(viewData.times);
    }

    function startClock() {
      if (!Time.hasClockStarted()) {
        Time.startClock();
      }
    }

    function times(week, day) {
      return Fn.sortDesc(_times[week][day]);
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