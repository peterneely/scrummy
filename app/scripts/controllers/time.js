'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Time', TimeController);

  TimeController.$inject = ['$modalInstance', 'Data', 'coreData'];

  function TimeController($modalInstance, Data, coreData) {

    var vm = this;

    vm.cancel = cancel;
    vm.data = coreData;
    vm.start = start;
    vm.state = {};

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function start () {
      $modalInstance.close();
      Data.startTimer(vm.state);
    }
  }

})();