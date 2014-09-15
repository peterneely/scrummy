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
    vm.prefs = prefsRoot();
    vm.start = startTimer;
    vm.timeEntry = {};

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function prefsRoot() {
      try {
        return viewData.user.preferences.timeEntry;
      } catch(err) {
        return {};
      }
    }

    function startTimer() {
      $modalInstance.close();
      Data.startTimer(viewData, validTimeEntry()).then(function () {
        Data.savePreferences(prefs(), viewData.user, 'timeEntry');
      });

      function prefs() {
        return {
          client: vm.timeEntry.client,
          project: vm.timeEntry.project,
          task: vm.timeEntry.task
        };
      }

      function validTimeEntry() {
        var startTime = vm.timeEntry.time.start;
        vm.timeEntry.time.start = startTime || Time.defaultTime();
        return vm.timeEntry;
      }
    }
  }

})();