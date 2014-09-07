'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Time', TimeController);

  TimeController.$inject = ['$modalInstance', 'Data', 'viewData'];

  function TimeController($modalInstance, Data, viewData) {

    var vm = this;

    vm.cancel = cancel;
    vm.data = viewData;
    vm.start = start;
    vm.timeEntry = {};

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function start () {
      $modalInstance.close();
      Data.startTimer(viewData.user, vm.timeEntry);
    }
  }

})();