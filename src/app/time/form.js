'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', '$scope', 'Time', 'viewData'];

  function TimeFormController($modalInstance, $scope, Time, viewData) {
//    console.log(viewData);
    var _type = {
      new: viewData.add,
      active: viewData.isActive
    };

    var vm = this;
    vm.cancel = cancel;
    vm.delete = deleteTime;
    vm.isNew = _type.new;
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
    vm.updateElapsedOnBlur = updateElapsedOnBlur;
    vm.viewData = viewData;
    vm.valid = true;
    vm.validate = validate;

    fillForm();
    updateElapsed();
    Time.onClockAlarm(updateElapsed);
    Time.onTimesUpdated(updateElapsed);

    function cancel() {
      $modalInstance.dismiss();
    }

    function deleteTime() {
      $modalInstance.close();
      Time.deleteTimer(viewData.$id);
    }

    function fillForm() {
      Time.fillSelects(vm.timeModel, viewData);
      if (!_type.new) {
        Time.fillOtherFields(vm.timeModel, viewData);
      }
    }

    function startTimer() {
      $modalInstance.close();
      _saveNewTypes().then(stopActiveTimers).then(startNewTimer).then(_saveState);

      function stopActiveTimers(timeModel) {
        return Time.stopActiveTimers(timeModel, viewData.times);
      }

      function startNewTimer(timeModel) {
        return Time.startNewTimer(timeModel);
      }
    }

    function updateElapsed() {
      if(angular.isDefined(viewData.time)){
        vm.elapsed = Time.updateElapsedOnForm(vm.timeModel.time, viewData.time);
      }
    }

    function updateElapsedOnBlur(){
      updateElapsed();
      $scope.$digest();
    }

    function updateTimer() {
      $modalInstance.close();
      _saveNewTypes().then(update).then(_saveState);

      function update(timeModel) {
        return Time.updateTimer(timeModel, viewData);
      }
    }

    function validate(control) {
      var valid = Time.isValid(vm.timeModel.time, _type);
      control.$setValidity('valid', valid);
      vm.valid = valid;
    }

    function _saveNewTypes() {
      return Time.saveNewTypes(vm.timeModel);
    }

    function _saveState(stateModel) {
      return Time.saveState(stateModel);
    }
  }

})();