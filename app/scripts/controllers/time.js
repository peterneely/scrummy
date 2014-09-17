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
          Data.saveTime(userName, timeEntry(types)).then(function (timeId) {
            Data.saveState(userName, types, timeId);
          });
        });

        function timeEntry(types) {
          return {
            client: types.client,
            project: types.project,
            task: types.task,
            time: {
              start: Time.start(vm.timeEntry.time),
              end: Time.end(vm.timeEntry.time)
            }
          };
        }
      }
    }
  }

})();