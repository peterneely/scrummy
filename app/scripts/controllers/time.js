'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Time', TimeController);

  TimeController.$inject = ['$modalInstance', 'Time' ,'Data', 'viewData'];

  function TimeController($modalInstance, Time, Data, viewData) {

    var vm = this;

    vm.cancel = cancel;
    vm.data = viewData;
    vm.start = startTimer;
    vm.timeEntry = {};

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function startTimer() {
      $modalInstance.close();
      Data.startTimer(viewData, validTimeEntry());

      function validTimeEntry(){
        var startTime = vm.timeEntry.time.start;
        vm.timeEntry.time.start = startTime || Time.defaultTime();
        return vm.timeEntry;
      }
    }
  }

})();