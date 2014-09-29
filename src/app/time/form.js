'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', '$scope', 'Config', 'Fn', 'Time', 'viewData'];

  function TimeFormController($modalInstance, $scope, Config, Fn, Time, viewData) {


    var _add = viewData.add;
    var _edit = !_add;
    var _date = initialDate();

    viewData.updated = { time: {} };

    var vm = this;
    vm.add = _add;
    vm.cancel = cancel;
    vm.changeDate = changeDate;
    vm.changeNotes = changeNotes;
    vm.isToday = true;
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
    vm.title = _add ? 'New Time Entry' : 'Update Time Entry';
    vm.update = updateTimer;
    vm.viewData = viewData;
    vm.validate = validate;

//    console.log($scope);

    fillForm();

    function cancel() {
      $modalInstance.dismiss();
    }

    function changeDate() {
      isToday();
      isDateUpdated();

      function isToday() {
        vm.isToday = Time.isToday(vm.timeModel.time.date);
      }

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
      fillSelects();
      if (_edit) {
        fillOtherFields();
      }

      function fillOtherFields() {
        vm.timeModel.notes = viewData.notes;
        vm.timeModel.time.date = Time.parseDate(viewData.time.start);
        vm.timeModel.time.start = Time.parseTime(viewData.time.start);
        vm.timeModel.time.end = Time.parseTime(viewData.time.end);
      }

      function fillSelects() {
        var state = viewData.user.state;
        var timeState = angular.isDefined(state) ? state.time : {};
        ['client', 'project', 'task'].forEach(function (type) {
          vm.timeModel[type] = _add ? defaultValue(type) : actualValue(type);
        });

        function actualValue(type) {
          return viewData[type];
        }

        function defaultValue(type) {
          return Fn.has(timeState, type) ? timeState[type] : first();

          function first() {
            return viewData[Fn.plural(type)][0];
          }
        }
      }
    }

    function initialDate() {
      if (_edit) {
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

    function validate(control, error, valid) {
      control.$setValidity(error, valid);
      console.log(control, error, valid);
    }
  }

})();