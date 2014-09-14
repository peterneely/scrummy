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

    console.log(vm.times);

    vm.getKeys = function(obj){
      return obj ? _.sortBy(Object.keys(obj)).reverse() : [];
    };

    watchTimes();

    function onOpen() {
      var config = Time.modalConfig(viewData);
      $modal.open(config);
    }

    function sortTimes() {
      return Time.sort(viewData.times);
    }

    function watchTimes() {
      Data.watch(viewData.times, function () {
        vm.times = sortTimes();
      });
    }
  }

})();