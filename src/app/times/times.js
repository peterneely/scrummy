'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['Clock', 'Resource', 'TimeForm', 'Times', 'Util', 'viewData'];

  function TimesController(Clock, Resource, TimeForm, Times, Util, viewData) {
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
      return TimeForm.open(viewData);
    }

    function days(week) {
      return keys(_times[week]);
    }

    function dayTitle(dayHeader) {
      return Times.dayTitle(dayHeader);
    }

    function keys(obj) {
      return Util.sortDesc(Object.keys(obj));
    }

    function sortTimes(){
      return Times.sort(viewData.times);
    }

    function startClock() {
      if (!Clock.hasStarted()) {
        Clock.start();
      }
    }

    function times(week, day) {
      return Util.sortDesc(_times[week][day]);
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