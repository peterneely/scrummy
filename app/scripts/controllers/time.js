'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Time', TimeController);

  TimeController.$inject = ['$modalInstance', 'Time' , 'Data', 'viewData'];

  function TimeController($modalInstance, Time, Data, viewData) {

    var vm = this;

    vm.cancel = cancel;
    vm.data = viewData;
    vm.timeEntryState = stateRoot();
    vm.start = startTimer;
    vm.timeEntry = {};

    function cancel() {
      $modalInstance.dismiss();
    }

    function stateRoot() {
      try {
        return viewData.user.state.timeEntry;
      } catch (err) {
        return {};
      }
    }

    function startTimer() {
      try {
        $modalInstance.close();
        start();
      } catch (error) {
      }

      function start() {
        var userName = viewData.user.userName;
        Data.saveNewTypes(userName, vm.timeEntry).then(function (types) {
          Data.saveTime(userName, updateModel(types)).then(function (timeId) {
            Data.saveState(userName, types, timeId);
          });
        });

        function updateModel(types) {
          updateTypes();
          validateStartTime();
          return vm.timeEntry;

          function updateTypes() {
            vm.timeEntry.client = types.client;
            vm.timeEntry.project = types.project;
            vm.timeEntry.task = types.task;
          }

          function validateStartTime() {
            var startTime = vm.timeEntry.time.start;
            vm.timeEntry.time.start = startTime || Time.defaultTime();
          }
        }
      }
    }
  }

})();