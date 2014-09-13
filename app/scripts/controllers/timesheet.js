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

    function onOpen() {
      var config = Time.modalConfig(viewData);
      $modal.open(config);
    }

    function sortTimes() {
      return Time.sort(viewData.times);
    }

    function watchTimes() {
      Data.watch(viewData.user, 'times', whenChanged);

      function whenChanged() {
        vm.times = sortTimes();
      }
    }
  }

})();