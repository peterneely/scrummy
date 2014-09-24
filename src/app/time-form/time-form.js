'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', '$filter', 'Time', 'Resource', 'Url', 'Timer', 'viewData'];

  function TimeFormController($modalInstance, $filter, Time, Resource, Url, Timer, viewData) {

    var _isNew = viewData.isNew;
    var _state = state();

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
      notes: '',
      time: {
        date: new Date(),
        start: '',
        end: ''
      }
    };

    fillForm();

    function cancel() {
      $modalInstance.dismiss();
    }

    function checkToday(){
      vm.isToday = Time.isToday(vm.timeModel.time.date);
    }

    function fillForm() {
      ['client', 'project', 'task'].forEach(function (type) {
        if(_isNew){
          previousSelections(type);
        } else {

        }
      });

      function previousSelections(type){
        var hasPref = _.has(_state, type);
        var first = viewData[$filter('plural')(type)][0];
        vm.timeModel[type] = hasPref ? _state[type] : first;
      }
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