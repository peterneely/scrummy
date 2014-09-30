'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', 'Config', 'Time', 'viewData'];

  function TimeFormController($modalInstance, Config, Time, viewData) {


    var _isNewTime = viewData.add;
    var _isUpdateTime = !_isNewTime;
    var _date = initialDate();

    viewData.updated = { time: {} };

    var vm = this;
    vm.add = _isNewTime;
    vm.cancel = cancel;
    vm.changeDate = changeDate;
    vm.changeNotes = changeNotes;
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
    vm.title = _isNewTime ? 'New Time Entry' : 'Update Time Entry';
    vm.update = updateTimer;
    vm.viewData = viewData;
    vm.validate = validate;

    fillForm();

    function cancel() {
      $modalInstance.dismiss();
    }

    function changeDate() {
      isDateUpdated();

      function isDateUpdated() {
        var date = vm.timeModel.time.date;
        if (date !== _date) {
          viewData.updated.time.date = date;
        }
      }
    }

    function changeNotes() {
      viewData.updated.notes = vm.timeModel.notes;
    }

    function fillForm() {
      Time.fillSelects(vm.timeModel, viewData, _isNewTime);
      if (_isUpdateTime) {
        Time.fillOtherFields(vm.timeModel, viewData);
      }
    }

    function initialDate() {
      if (_isUpdateTime) {
        var start = viewData.time.start;
        return Time.format(start, Config.dateFormat);
      }
    }

    function startTimer() {
      $modalInstance.close();

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
        return Time.saveState(stateModel);
      }
    }

    function updateTimer() {

      //validate date fields (end is greater than start): http://stackoverflow.com/questions/16885382/how-can-i-force-an-angular-validation-directive-to-run


//      $modalInstance.close();

//      timeForm.end.$setValidity('oh-noes', false);
//      console.log(timeForm.end);
//      console.log(viewData.updated);

//      Time.saveNewTypes(vm.timeModel)
//        .then(updateTimer)
//        .then(saveState);
//
//      function updateTimer(timeModel) {
//        return Time.updateTimer(timeModel);
//      }
//
//      function saveState(stateModel) {
//        return Time.saveState(stateModel);
//      }
    }

    function validate(control) {
      var valid = Time.isValid(vm.timeModel, _isNewTime, viewData.isActive);
      control.$setValidity('valid', valid);
      console.log(control);
    }
  }

})();