'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', '$scope', 'Time', 'viewData'];

  function TimeFormController($modalInstance, $scope, Time, viewData) {
    var _type = {
      new: viewData.add,
      active: viewData.isActive
    };
    var _showElapsed = !_type.new && !_type.active;

    var vm = this;
    vm.cancel = cancel;
    vm.delete = deleteTime;
    vm.elapsed = elapsed();
    vm.isNew = _type.new;
    vm.refreshElapsed = refreshElapsed;
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
    vm.valid = true;
    vm.validate = validate;

    fillForm();

    function cancel() {
      $modalInstance.dismiss();
    }

    function deleteTime() {
      $modalInstance.close();
      Time.deleteTimer(viewData.$id);
    }

    function elapsed() {
      return _showElapsed ? Time.elapsed(viewData.time.start, viewData.time.end) : '';
    }

    function fillForm() {
      Time.fillSelects(vm.timeModel, viewData);
      if (!_type.new) {
        Time.fillOtherFields(vm.timeModel, viewData);
      }
    }

    function refreshElapsed() {
      if (_showElapsed) {
        vm.elapsed = Time.refreshElapsed(vm.timeModel, viewData);
        $scope.$digest();
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