'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', 'Fn', 'Time', 'viewData'];

  function TimeFormController($modalInstance, Fn, Time, viewData) {

    var _add = viewData.add;
    var _edit = !_add;

    var vm = this;
    vm.add = _add;
    vm.cancel = cancel;
    vm.checkToday = checkToday;
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

    fillForm();

    function cancel() {
      $modalInstance.dismiss();
    }

    function checkToday() {
      vm.isToday = Time.isToday(vm.timeModel.time.date);
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
      $modalInstance.close();

//      Time.saveNewTypes(vm.timeModel)
//        .then(stopActiveTimers)
//        .then(startNewTimer)
//        .then(saveState);

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
  }

})();