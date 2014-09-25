'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', '$filter', 'Time', 'Resource', 'Url', 'Timer', 'viewData'];

  function TimeFormController($modalInstance, $filter, Time, Resource, Url, Timer, viewData) {

    var _add = viewData.add;
    var _edit = !_add;
    var _state = viewData.user.state.time || {};

    var vm = this;
    vm.cancel = cancel;
    vm.checkToday = checkToday;
    vm.data = viewData;
    vm.isToday = true;
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
        ['client', 'project', 'task'].forEach(function (type) {
          vm.timeModel[type] = _add ? defaultValue(type) : actualValue(type);
        });

        function actualValue(type) {
          return viewData[type];
        }

        function defaultValue(type) {
          return _.has(_state, type) ? _state[type] : first();

          function first() {
            return viewData[$filter('plural')(type)][0];
          }
        }
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
  }

})();