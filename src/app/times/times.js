'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['Timer', 'Resource', 'Time', 'viewData'];

  function TimesController(Timer, Resource, Time, viewData) {
    console.log(viewData);

    var _times = sortTimes();

    watchTimes();
    startTimer();

    var vm = this;
    vm.addTime = addTime;
    vm.days = days;
    vm.times = times;
    vm.viewData = viewData;
    vm.weeks = weeks;

    function addTime() {
      return Time.openTimeForm(viewData);
    }

    function days(week) {
      return keys(_times[week]);
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
        return Time.daySortOrder(time.time.start);
      }

      function byWeek(time) {
        return Time.weekSortOrder(time.time.start);
      }
    }

    function startTimer(){
      if(!Timer.hasStarted()){
        Timer.start();
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