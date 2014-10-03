'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['Fn', 'Resource', 'Time', 'viewData'];

  function TimesController(Fn, Resource, Time, viewData) {
//    console.log(viewData);

    var _times = sortTimes();

    var vm = this;
    vm.addTime = addTime;
    vm.days = days;
    vm.dayTitle = dayTitle;
    vm.times = times;
    vm.viewData = viewData;
    vm.weeks = weeks;

    checkNoData();
    watchTimes();

    function addTime() {
      return Time.openForm(viewData);
    }

    function checkNoData(){
      vm.noData = viewData.times.length === 0;
    }

    function days(week) {
      return _keys(_times[week]);
    }

    function dayTitle(dayHeader) {
      return Time.dayTitle(dayHeader);
    }

    function sortTimes() {
      return Time.sort(viewData.times);
    }

    function times(week, day) {
      return Fn.sortDescBy(_times[week][day], by);

      function by(item) {
        return item.time.start;
      }
    }

    function watchTimes() {
      Resource.watch(viewData.times, changed);

      function changed() {
        checkNoData();
        _times = sortTimes();
        Time.notifyTimesUpdated();
      }
    }

    function weeks() {
      return _keys(_times);
    }

    function _keys(obj) {
      return Fn.sortDesc(Object.keys(obj));
    }
  }

})();