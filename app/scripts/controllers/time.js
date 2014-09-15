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
      $modalInstance.dismiss();
    }

    function prefsRoot() {
      try {
        return viewData.user.preferences.timeEntry;
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
          Data.startTimer(userName, updateModel(types)).then(function () {
            Data.savePreferences(prefs(), userName, 'timeEntry');
          });
        });

        function prefs() {
          return {
            client: vm.timeEntry.client,
            project: vm.timeEntry.project,
            task: vm.timeEntry.task
          };
        }

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