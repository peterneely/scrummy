'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$modal', 'Data', 'Time', 'viewData'];

  function TimesheetController($modal, Data, Time, viewData) {

    var vm = this;
    vm.open = onOpen;
    vm.times = sortTimes();

    watchTimes();

    console.log(vm.times);

    function onOpen() {
      var config = Time.modalConfig(viewData);
      $modal.open(config);
    }

    function sortTimes() {
//      var deep = true;
//      var clonedTimes = _.clone(viewData.times, deep);
//      return Time.sort(clonedTimes);
      return Time.sort(viewData.times);
    }

    function watchTimes() {
      Data.watch(viewData.times, function () {
        vm.times = sortTimes();
      });
    }
  }

})();