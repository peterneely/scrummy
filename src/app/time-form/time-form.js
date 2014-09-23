'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', 'Time', 'Resource', 'Url', 'Timer', 'viewData'];

  function TimeFormController($modalInstance, Time, Resource, Url, Timer, viewData) {

    var vm = this;

    vm.cancel = cancel;
    vm.checkToday = checkToday;
    vm.data = viewData;
    vm.isToday = true;
    vm.state = state();
    vm.start = startTimer;
    vm.timeModel = {
      client: {},
      project: {},
      task: {},
      time: {
        date: new Date(),
        start: '',
        end: ''
      }
    };

    function cancel() {
      $modalInstance.dismiss();
    }

    function checkToday(){
      vm.isToday = Time.isToday(vm.timeModel.time.date);
    }

    function startTimer() {
      try {
        $modalInstance.close();
        Timer.reset();
        start();
      } catch (error) {
      }

      function start() {
        Time.saveNewTypes(vm.timeModel)
          .then(stopActiveTimers)
          .then(startNewTimer)
          .then(saveState);

        function stopActiveTimers(timeModel) {
          return Time.stopActiveTimers(timeModel, viewData.times);
        }

        function startNewTimer(timeModel) {
          return Time.startNewTimer(timeModel);
        }

        function saveState(stateModel) {
          return Resource.put(Url.userStateTime(), stateModel);
        }
      }
    }

    function state() {
      try {
        return viewData.user.state.time;
      } catch (err) {
        return {};
      }
    }
  }

})();