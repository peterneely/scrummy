'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$modal', 'Data', 'Time', 'viewData'];

  function TimesheetController($modal, Data, Time, viewData) {

    var _times = sortTimes();

    watchTimes();

    var vm = this;
    vm.days = days;
    vm.open = onOpen;
    vm.times = times;
    vm.weeks = weeks;

    function days(week){
      return keys(_times[week]);
    }

    function keys(obj) {
      return mostRecentFirst(Object.keys(obj));
    }

    function mostRecentFirst(collection){
      return _.sortBy(collection).reverse();
    }

    function onOpen() {
      var config = Time.modalConfig(viewData);
      $modal.open(config);
    }

    function sortTimes() {
      return Time.sort(viewData.times);
    }

    function times(day, week){
      return mostRecentFirst(_times[week][day]);
    }

    function watchTimes() {
      Data.watch(viewData.times, function () {
        _times = sortTimes();
      });
    }

    function weeks(){
      return keys(_times);
    }
  }

})();