'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Time', TimeController);

  TimeController.$inject = ['$modalInstance', 'Data', 'Time', 'viewData'];

  function TimeController($modalInstance, Data, Time, viewData) {

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
      Data.startTimer(viewData, vm.timeEntry).then(function(){
        Time.updated();
      });
    }
  }

})();