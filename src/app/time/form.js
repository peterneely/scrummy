'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', 'Time', 'viewData'];

  function TimeFormController($modalInstance, Time, viewData) {
    var _type = {
      new: viewData.add,
      active: viewData.isActive
    };

    var vm = this;
    vm.add = _type.new;
    vm.cancel = cancel;
    vm.start = startTimer;
    vm.timeModel = {
      client: {},
      project: {},
      task: {},
      notes: '',
      time: {
        date: Time.now(),
        start: '',
        end: ''
      }
    };
    vm.title = _type.new ? 'New Time Entry' : 'Update Time Entry';
    vm.update = updateTimer;
    vm.viewData = viewData;
    vm.validate = validate;

    fillForm();

    function cancel() {
      $modalInstance.dismiss();
    }

    function fillForm() {
      Time.fillSelects(vm.timeModel, viewData);
      if (!_type.new) {
        Time.fillOtherFields(vm.timeModel, viewData);
      }
    }

    function saveNewTypes(){
      return Time.saveNewTypes(vm.timeModel);
    }

    function saveState(stateModel) {
      return Time.saveState(stateModel);
    }

    function startTimer() {
      $modalInstance.close();
      saveNewTypes().then(stopActiveTimers).then(startNewTimer).then(saveState);

      function stopActiveTimers(timeModel) {
        return Time.stopActiveTimers(timeModel, viewData.times);
      }

      function startNewTimer(timeModel) {
        return Time.startNewTimer(timeModel);
      }
    }

    function updateTimer() {
      $modalInstance.close();
      saveNewTypes().then(updateTimer).then(saveState);

      function updateTimer(timeModel) {
        return Time.updateTimer(timeModel, viewData.$id);
      }
    }

    function validate(control) {
      var valid = Time.isValid(vm.timeModel, _type);
      control.$setValidity('valid', valid);
    }
  }

})();